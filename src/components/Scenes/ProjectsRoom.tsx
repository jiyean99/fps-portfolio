import { projects } from '../../data/projects';
import { ProjectItem } from '../Objects/ProjectItem';

export function ProjectsRoom() {
    return (
        <>
            <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="darkslateblue" />
            </mesh>

            {projects.map((project) => (
                <ProjectItem
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    position={project.position as [number, number, number]}
                    description={project.description}
                />
            ))}
        </>
    );
}
