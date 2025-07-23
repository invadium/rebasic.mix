function setupProfile() {
    env.profile = 'default'
    lib.storage.restoreProfile()
    log(`PROFILE: [${env.profile}]`)
}
setupProfile.Z = 21
