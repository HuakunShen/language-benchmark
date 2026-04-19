cmake_minimum_required(VERSION 3.30)
project(cpp)

set(CMAKE_CXX_STANDARD 26)
find_package(nlohmann_json 3.2.0 REQUIRED)
add_executable(cpp main.cpp)
target_link_libraries(cpp PRIVATE nlohmann_json::nlohmann_json)
# Add optimization flags for Release builds
set(CMAKE_CXX_FLAGS_RELEASE "-O3")