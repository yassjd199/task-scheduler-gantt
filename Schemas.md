CREATE TABLE Projects (
id SERIAL PRIMARY KEY, -- Unique identifier for each project
name VARCHAR(255) NOT NULL UNIQUE, -- Name of the project; must be unique
description TEXT, -- Description of the project
startDate DATE NOT NULL, -- Start date of the project
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the project was created
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the project was last updated
CONSTRAINT startDate_not_in_future CHECK (startDate <= CURRENT_DATE) -- Ensure startDate is not in the future
);


CREATE TABLE Tasks (
id SERIAL PRIMARY KEY, -- Unique identifier for each task
projectId INTEGER REFERENCES Projects(id) ON DELETE CASCADE, -- Foreign key to Projects table
name VARCHAR(255) NOT NULL, -- Name of the task
startDate DATE, -- Start date of the task
endDate DATE, -- End date of the task
duration INTEGER CHECK (duration >= 0), -- Duration of the task in days; must be non-negative
progress INTEGER CHECK (progress BETWEEN 0 AND 100), -- Progress of the task; between 0 and 100 percent
isCritical BOOLEAN DEFAULT FALSE, -- Indicates if the task is critical
isMilestone BOOLEAN DEFAULT FALSE, -- Indicates if the task is a milestone
resources TEXT[], -- Array of resource names or IDs; consider using a join table if this becomes complex
earlyStart DATE, -- Earliest possible start date for the task
lateStart DATE, -- Latest possible start date for the task
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the task was created
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the task was last updated
description TEXT, -- a brief description for the task 
CONSTRAINT start_before_end CHECK (startDate <= endDate) -- Ensure startDate is before endDate
);

CREATE TABLE TaskDependencies (
id SERIAL PRIMARY KEY, -- Unique identifier for each dependency
taskId INTEGER REFERENCES Tasks(id) ON DELETE CASCADE, -- Foreign key to the dependent task
dependsOnTaskId INTEGER REFERENCES Tasks(id) ON DELETE CASCADE, -- Foreign key to the task that the current task depends on
dependencyType VARCHAR(10), -- Type of dependency (e.g., FS, SS)
CONSTRAINT unique_dependency UNIQUE (taskId, dependsOnTaskId) -- Ensure that each dependency is unique
);
