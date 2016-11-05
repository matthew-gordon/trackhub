# Planning our application

1. Answer questions
	- What am I building?
	- Who am I building it for?
	- What features do I need to have?
2. User Stories
3. Model our Data
4. Think through the pages I need in my app

## Questions

1. What am I building? A project manager for web developers that integrtes with github. A place where I can create projects to share with collaborators, or manage by myself.   
2. Who am I building it for?  I am building it for myself, also for the web developmwnt community. Managing a project with a central location for projects, tasks and planning. This will help project workflow and time management.
3. What features do we need to have?
	- Projects
		- Create / Edit/ Destroy
		- Tasks
			- Priority level
			- Task type
			
## User Stories

- As a user, I want to be able to create empty project so that I can work on the specific project.
- As a user, I want to be able to edit and delete projects so that I can manage the project easily.
- As a user, I want to be able to invite collaborators to my project.
- As a user, I want to be able to leave comments for collaborators.
- As a collaborator, I want to be able to leave messages/comments for the project manager.
- As a user, I want to be able to create tasks inside of the project so that I can track work to be done, and stay organized.
- As a user, I want to be able to assign the type of task, and priority level.

## Modeling our Data

1. **Project**
	- title:string
	- description:textarea
	- projectmanager:string
	- tasks:object
		- title:string
		- desc:textarea
    
2. **Users**
	- username:string
	- authToken:string
	- projects:object
	- role:string
