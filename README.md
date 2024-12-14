# Image Inpainting Widget

A React-based web application that allows users to upload images, create masks by drawing on them, and export both the original image and the mask.

## Features
- Image upload via drag & drop or file selection
- Interactive canvas for mask creation
- Adjustable brush size
- Undo/Clear functionality
- Export functionality for mask image
- Smooth animations and transitions
- Responsive design

## How to Run Locally

1. Clone the repository by running the following command in your terminal
```
git clone https://github.com/AnimezKishan/image-pipeline-assignment.git
```
2. Navigate to the project directory
```
cd image-inpainting-widget
```
3. Install dependencies
```
npm install
```
4. Start the development server
```
npm run dev
```
5. Open your browser and visit `http://localhost:5173`

## Libraries Used

- **React**: Frontend framework
- **React Router DOM**: For handling navigation between components
- **GSAP (GreenSock Animation Platform)**: For smooth loading animations
- **react-canvas-draw**: For drawing functionality on canvas
- **Tailwind CSS**: For styling and responsive design


## Challenges Faced and Solutions

1. **Challenge**: Implementing drag and drop functionality
   - **Solution**: Used HTML5 drag and drop API with custom event handlers to prevent default browser behavior and handle file uploads.

2. **Challenge**: Creating a mask with black background and white drawings
   - **Solution**: Used a temporary canvas to convert the transparent background to black while preserving the white drawings.

3. **Challenge**: Managing loader animation state across sessions
   - **Solution**: Implemented sessionStorage to track if the loader animation has been shown, preventing repeated animations in the same session.