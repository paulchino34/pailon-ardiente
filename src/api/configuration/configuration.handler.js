import Configuration from './configuration.model.js'

const getConfiguration = async (req, res) => {
    try {
        const { name } = req.params
        const configuration = await Configuration.findOne({ name })
        return res.json({
            ok: true,
            msg: "Configuratión obtenida",
            data: configuration
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateConfiguration = async (req, res) => {
    const { name } = req.params
    const data = req.body
    try {
        const configuration = await Configuration.findOne({ name })
        if (configuration) {
            await Configuration.updateOne({ name }, { data })
        } else {
            await Configuration.create({ name, data })
        }
        res.json({
            ok: true,
            msg: "Configuration actualizada",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

const deleteConfiguration = async (req, res) => {
    try {
        const { name } = req.params
        await Configuration.deleteOne({ name })
        res.json({
            ok: true,
            msg: "Configuration eliminada",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

export { getConfiguration, updateConfiguration, deleteConfiguration }