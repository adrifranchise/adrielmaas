from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production!
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Database Models
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(100))
    technologies = db.Column(db.String(200))
    github = db.Column(db.String(200))
    live = db.Column(db.String(200))
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image': self.image,
            'technologies': self.technologies.split(',') if self.technologies else [],
            'github': self.github,
            'live': self.live
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    excerpt = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date.isoformat(),
            'excerpt': self.excerpt,
            'content': self.content
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)  # In production, use password hashing!

# Create all database tables
with app.app_context():
    db.create_all()
    
    # Add sample data if the database is empty
    if not Project.query.first():
        sample_projects = [
            Project(
                title="Personal Website",
                description="A responsive personal website built with React and Flask to showcase my projects and thoughts.",
                image="project1.jpg",
                technologies="React,Flask,Tailwind CSS,Python",
                github="https://github.com/yourusername/personal-website",
                live="https://project1.yourdomain.com"
            ),
            Project(
                title="Task Management App",
                description="A full-stack task management application with user authentication and real-time updates.",
                image="project2.jpg",
                technologies="React,Node.js,MongoDB,Express",
                github="https://github.com/yourusername/task-app",
                live="https://project2.yourdomain.com"
            )
        ]
        
        sample_posts = [
            Post(
                title="The Art of Clean Code",
                date=datetime(2025, 4, 1),
                excerpt="Exploring principles and practices that lead to maintainable and elegant code.",
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel tincidunt iaculis, nisl nunc aliquam lorem, eget efficitur nisl nunc eu nisl."
            ),
            Post(
                title="React Hooks: A Mental Model",
                date=datetime(2025, 3, 15),
                excerpt="A conceptual framework for understanding React Hooks and their practical applications.",
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel tincidunt iaculis, nisl nunc aliquam lorem, eget efficitur nisl nunc eu nisl."
            )
        ]
        
        # Add admin user (for development only - use proper authentication in production)
        admin_user = User(username="admin", password="password")
        
        db.session.add_all(sample_projects + sample_posts + [admin_user])
        db.session.commit()

# API Routes
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello from Flask!"})

# Projects endpoints
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict())

@app.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    data = request.json
    
    new_project = Project(
        title=data['title'],
        description=data['description'],
        image=data.get('image', ''),
        technologies=','.join(data.get('technologies', [])),
        github=data.get('github', ''),
        live=data.get('live', '')
    )
    
    db.session.add(new_project)
    db.session.commit()
    
    return jsonify(new_project.to_dict()), 201

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.json
    
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.image = data.get('image', project.image)
    project.technologies = ','.join(data.get('technologies', project.technologies.split(',')))
    project.github = data.get('github', project.github)
    project.live = data.get('live', project.live)
    
    db.session.commit()
    
    return jsonify(project.to_dict())

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    
    db.session.delete(project)
    db.session.commit()
    
    return jsonify({"message": f"Project {project_id} deleted"}), 200

# Posts endpoints
@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.date.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.to_dict())

@app.route('/api/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.json
    
    new_post = Post(
        title=data['title'],
        excerpt=data['excerpt'],
        content=data['content'],
        date=datetime.utcnow()
    )
    
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify(new_post.to_dict()), 201

@app.route('/api/posts/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.json
    
    post.title = data.get('title', post.title)
    post.excerpt = data.get('excerpt', post.excerpt)
    post.content = data.get('content', post.content)
    
    db.session.commit()
    
    return jsonify(post.to_dict())

@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    
    db.session.delete(post)
    db.session.commit()
    
    return jsonify({"message": f"Post {post_id} deleted"}), 200

# Authentication
@app.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
        
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
        
    user = User.query.filter_by(username=username).first()
    
    if not user or user.password != password:  # In production, use proper password verification
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
