# Chainsaw-3D Web
<div align="center">
  <img src="https://github.com/user-attachments/assets/f6a8f259-22ac-4c55-bd5a-ae384c992684" width="500"/>
</div><br>
<p>
This is a web application that displays an interactive 3D chainsaw model, which responds to API requests by animating or moving the chainsaw. It utilizes WebGL and popular libraries like Three.js to render the 3D model, making it possible for users to view and interact with the chainsaw in a dynamic way.
</p>

## Features
- **Interactive 3D Model**: Users can rotate, zoom, and explore the chainsaw model.
- **API Interaction**: The chainsaw model moves or animates when a POST request is made to the API endpoint.
- **Smooth Animation**: The chainsaw reacts with smooth, real-time movement when the API is hit, such as starting the engine or rotating the blade.
  
## Technologies Used
- **Three.js**: A powerful JavaScript library for rendering 3D graphics in the browser using WebGL.
- **WebGL**: The underlying technology for rendering interactive 3D content.
- **Node.js / Express**: For handling the API requests and serving the web application.
  
## How to Use

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/chainsaw-3d.git
    cd chainsaw-3d
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

4. Visit the web application in your browser at `http://localhost:3000`.

### API Endpoint
The chainsaw will animate when a POST request is made to the following endpoint:
- **POST /animate**

#### Request Example:
```bash
curl -X POST http://localhost:3000/animate
```

This triggers the movement or animation of the chainsaw model.

### Interacting with the Model
- Use your mouse or touchpad to rotate the 3D chainsaw model.
- Scroll to zoom in or out.
  
## Customization
- You can modify the chainsaw model by replacing the `.glb` file in the `/models` directory with your custom 3D model.
- To adjust animations, refer to the animation settings in the `app.js` file and modify the parameters for movement and speed.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
