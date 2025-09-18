// 代码生成时间: 2025-09-18 13:28:10
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 用户身份认证类
class UserAuthentication {
  constructor() {
    this.users = {}; // 存储用户信息
  }

  // 添加用户
  addUser(userId, password) {
    if (this.users[userId]) {
      throw new Error('User already exists');
    }
    this.users[userId] = password;
  }

  // 验证用户
  authenticateUser(userId, password) {
    if (this.users[userId] && this.users[userId] === password) {
      return true;
    }
    return false;
  }

  // 删除用户
  removeUser(userId) {
    if (!this.users[userId]) {
      throw new Error('User does not exist');
    }
    delete this.users[userId];
  }
}

// 使用示例
try {
  const auth = new UserAuthentication();
  auth.addUser('user1', 'password123');
  console.log(auth.authenticateUser('user1', 'password123')); // 输出: true
  console.log(auth.authenticateUser('user1', 'wrongPassword')); // 输出: false
  auth.removeUser('user1');
  console.log(auth.authenticateUser('user1', 'password123')); // 输出: false
} catch (error) {
  console.error(error);
}

// 创建THREE.js场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 创建一个简单的立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 动画循环
const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

// 监听窗口大小变化
window.addEventListener('resize', onWindowResize, false);

// 窗口大小变化时的处理函数
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
