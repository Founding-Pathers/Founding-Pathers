# Founding-Pathers

Application Repository

<br />
<div align="center">
  <a href="">
    <img src="" alt="Logo">
  </a>

<h3 align="center">[2023-24-T2](DCS+SMT) 33-Founding Pathers</h3>

  <p align="center"><strong>
    Final Year Project: Cycle-Pathic
  </strong></p>
  <p align="center">
    Personalised Routing in Smart Cities, 
a User-Centric Approach
  </p>
</div>

## About The Project

Our project entails developing an open-source, proof-of-concept, and mobile-friendly web application to enhance the WCN. Core deliverables involve an account module, QGIS-based routing, and user interface (UI) enhancements. Secondary deliverables include additional UI features allowing users to customise routes with points of interest and a cloud configuration and deployment solution tentatively utilising Amazon Web Services. A feedback loop for users to report route blockages via OneService are good-to-haves. Challenges include migrating URA’s routing engine from ArcGIS to QGIS, sourcing a suitable API for the web application, managing cloud deployment costs, and ensuring data availability from URA. Adhering to Scrum methodology, core functionalities are targeted for completion by sprints ending in Midterms and Finals. Successful completion of this project will provide URA with valuable insights into citizen transportation preferences, contributing to more effective urban policies. Improved navigation is also expected to foster safety, convenience, healthy lifestyles and inclusivity for society, promoting sustainable transportation and aligning with URA's vision for a vibrant, connected Singapore.

### Core Functionalities

- A proof-of-concept web application (Software development)

- A cloud configuration and deployment solution (System configuration)

## Built With

### Major Frameworks / Libraries

#### Front-end frameworks and libraries

- React

#### Back-end frameworks and libraries

- Node.js
- Express.js
- MongoDB

#### Containerized application software framework
- Docker

#### Continuous Integration

- ![Codacy](https://img.shields.io/badge/Codacy-222F29.svg?style=for-the-badge&logo=Codacy&logoColor=white)
- ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white)
- Jest Testing

#### Continuous Deployment
- ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white)
- Amazon Web Services
- Terraform Cloud

## Getting Started

### Prerequisites

- Install the following:
  Docker Desktop App (optional)
  MongoDB Compass

### App Initialization

1. Clone the repo
   ```sh
   git clone 
    ```
2. Pull the repo
    ```sh
    git pull 
    ```
3. Ensure you have Docker Desktop running
4. Navigate to the project directory
5. Create a copy of the `.env` file from the Google Drive link shared. Place this file in the main directory. (Google Drive Link provided via text file in submission document).
6. Build the Docker images and containers (initial build will take awhile)
   ```sh
   docker-compose up 
   ```

### App Initialization without Docker

1. Clone the repo
   ```sh
   git clone 
    ```
2. Pull the repo
    ```sh
    git pull 
    ```
3. Navigate to the project directory
4. Create a copy of the `.env` file from the Google Drive link shared. Place this file in the main directory. (Google Drive Link provided via text file in submission document).
5. Split the terminal into two
6. On one of the terminals, run the following code:
    ```sh
    cd backend
    npm install
    ```
   After the backend modules have been installed, initialize the backend with the following code:
    ```sh
    nodemon server.js
    ```
7. On the other terminal, run the following code:
    ```sh
    cd app
    npm install
    ```
   After the frontend modules have been installed, initialize the frontend with the following code:
    ```sh
    npm start
    ```

## Usage

To use the application, follow these steps:

1. Open the application in a web browser.
2. Follow the on-screen instructions to navigate through the application's features.
3. If prompted, enter any required input values or select desired options.
4. When finished, exit the application or close the web browser.

## Team
|| <img src="https://avatars.githubusercontent.com/u/68149788?v=4" width="100"></img> | <img src="https://avatars.githubusercontent.com/u/111420736?v=4" width="100"></img> | <img src="https://avatars.githubusercontent.com/u/111410622?v=4" width="100"></img> | <img src="https://avatars.githubusercontent.com/u/144538254?v=4" width="100"></img> | <img src="https://avatars.githubusercontent.com/u/65487985?v=4" width="100"></img> | <img src="https://avatars.githubusercontent.com/u/140048767?v=4" width="100"></img> |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | 
| Name | Gic Ci | Keith | Jaymie | Megan | Kyla | Jeremy | 
| Role | Product Owner, Developer | Scrum Master, Cloud and Backend Developer | Developer | Developer | Full-Stack Developer | Backend and Database Developer |
| Github | Gic Ci | [![keith](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/KeithLaww) | Jaymie | Megan | Kyla  | [![jeremy](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/jeremygmc) |
