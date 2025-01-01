const LoggingLevel = {
    // Critical levels. (It will crash the process)
    Fatal: 0,
    Error: 1,

    // Warning levels. (It just report warning information, not crash the process)
    Warning: 2,

    // Regular level and aliases.
    Notice: 3,
    Info: 3,

    // Maybe sensitive levels. (In general, does not useful)
    Http: 4,
    Query: 4,

    // Loud levels.
    Verbose: 5,
    Debug: 5,
} as const

type LoggingLevel = typeof LoggingLevel[keyof typeof LoggingLevel]

export default LoggingLevel
