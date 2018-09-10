const NotNull = <T>(func: () => T | null | undefined, error?: string): T => {
    const candidate: T | null | undefined = func()
    if (!candidate) throw new Error(`Null or Undefined ${(error ? `: ${error}` : '')}`)
    else return candidate
}

export default NotNull
