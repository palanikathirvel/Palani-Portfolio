@echo off
cd "c:\Users\PALANI KATHIRVEL\OneDrive\Desktop\myportfolio"
echo Starting development servers...
echo.
echo Make sure MongoDB is running on localhost:27017
echo.
start "Backend Server" cmd /k "cd Palani-Portfolio && npm run server"
timeout /t 2
start "Frontend Server" cmd /k "cd Palani-Portfolio && npm run dev"
echo.
echo Backend running on: http://localhost:5000
echo Frontend running on: http://localhost:8080
