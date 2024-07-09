import React from 'react';
import PropTypes from 'prop-types';
import { ProjectDisplay } from '../ProjectDisplay/projectDisplay';
import { TaskDisplay } from '../TaskDisplay/taskDisplay';
import styles from './list.module.css';

export const List = ({ items, type }) => {
    return (
        <table className={styles.list}>
            <thead>
                {(() => {
                    if (type === 'project') {
                        return (
                            <tr>
                                <th className={styles.headerColumn}>Project Name</th>
                                <th className={styles.headerColumn}>Tasks</th>
                                <th className={styles.headerColumn}>Status</th>
                            </tr>
                        );
                    } else if (type === 'task') {
                        return (
                            <tr>
                                <th className={styles.headerColumn}>Task Name</th>
                                <th className={styles.headerColumn}>Due Date</th>
                                <th className={styles.headerColumn}>Importance</th>
                                <th className={styles.headerColumn}>Is Completed</th>
                            </tr>
                        );
                    }
                })()}
            </thead>
            {items.map((item, index) => {
                if (type === 'project') {
                    return (
                        <ProjectDisplay
                            key={index}
                            name={item.name}
                            totalTasks={item.totalTasks}
                            completedTasks={item.completedTasks}
                            initialStatus={item.initialStatus}
                        />
                    );
                } else if (type === 'task') {
                    return (
                        <TaskDisplay
                            key={index}
                            name={item.name}
                            deadline={item.deadline}
                            initialImportance={item.initialImportance}
                            initialIsCompleted={item.initialIsCompleted}
                        />
                    );
                }
                return null;
            })}
        </table>
    );
};

List.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['project', 'task']).isRequired,
};
