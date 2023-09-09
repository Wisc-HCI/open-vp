export const STATUS = {
    PENDING: 'PENDING',
    VALID: 'VALID',
    FAILED: 'FAILED',
    WARN: 'WARN'
}

export const ERROR = {
    MISSING_PARAMETER: 'MISSING_PARAMETER',
    INVALID_PARAMETER: 'INVALID_PARAMETER',
    MISMATCHED_GIZMO: 'MISMATCHED_GIZMO',
    UNREACHABLE_POSE: 'UNREACHABLE_POSE',
    TRAJECTORY_PROGRESS: 'TRAJECTORY_PROGRESS',
    CHILD_FAILED: 'CHILD_FAILED',
    DOES_NOTHING: 'DOES_NOTHING'
}

export const COMPILE_FUNCTIONS = {
    NULL: 0,
    SIMPLE: 1,
    MACHINE: 2,
    DELAY: 3,
    BREAK: 4,
    PROCESS: 5,
    SKILL: 6,
    POSE: 7,
    ROBOT_MOTION: 8,
    GRIPPER_MOTION: 9,
    ROBOT_AGENT: 10,
    HUMAN_AGENT: 11,
    GRIPPER: 12,
    LINK: 13,
    PROPERTY: 14
}

export const STEP_TYPE = {
    LANDMARK: 'LANDMARK',
    SCENE_UPDATE: 'SCENE_UPDATE',
    ACTION_START: 'ACTION_START',
    ACTION_END: 'ACTION_END',
    PROCESS_START: 'PROCESS_START',
    PROCESS_END: 'PROCESS_END',
    SPAWN_ITEM: 'SPAWN_ITEM',
    DESTROY_ITEM: 'DESTROY_ITEM'
}

export const TRIGGER_TYPE = {
    TRACK_COMPLETES: 'TRACK_COMPLETES',
    SIGNAL: 'SIGNAL'
}

export const ROOT_BOUNDS = [
    {value:0.0,delta:0.0},{value:0.0,delta:0.0},{value:0.0,delta:0.0}, // Translational
    {value:0.0,delta:0.0},{value:0.0,delta:0.0},{value:0.0,delta:0.0}  // Rotational
]

export const DETAIL_TYPES = ['machineType', 'inputOutputType', 'processType', 'locationType', 'waypointType', 'thingType','fixtureType','toolType','robotAgentType','humanAgentType','gripperType']
export const TIMELINE_TYPES = ['programType', 'skillType', 'hierarchicalType', 'delayType',
                        'moveGripperType', 'machineInitType', 'processStartType', 
                        'processWaitType', 'processStopType', 'moveTrajectoryType'
                    ]
export const PREVIEW_TYPES = [...TIMELINE_TYPES,'locationType','waypointType'];
export const REFERENCEABLE_OBJECTS = ["machineType", "fixtureType", "linkType", "toolType", "robotAgentType", "humanAgentType", 'gripperType'];