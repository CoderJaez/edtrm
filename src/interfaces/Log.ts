interface Log {
    IDNUM: number
    LOGTIME: Date
    INOUT: number
    LON: number
    LAT: number
    EMPNAME: string | null
    DIVISIONCODE?: string
}

export default Log