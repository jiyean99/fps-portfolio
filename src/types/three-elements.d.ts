import { Object3D, Material, BufferGeometry } from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Object3DNode<Object3D, typeof Object3D>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      boxGeometry: ReactThreeFiber.BufferGeometryNode<BufferGeometry, typeof BufferGeometry>;
      planeGeometry: ReactThreeFiber.BufferGeometryNode<BufferGeometry, typeof BufferGeometry>;
      meshStandardMaterial: ReactThreeFiber.MaterialNode<Material, typeof Material>;
    }
  }
} 