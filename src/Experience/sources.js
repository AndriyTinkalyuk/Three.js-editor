export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path: [
           'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/grass/GrassColor.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/grass/GrassNormal.jpg'
    },
    {
        name: 'houseModel',
        type: "gltfModel",
        path: "models/House/scene.gltf"
    },
     {
        name: 'tableModel',
        type: "gltfModel",
        path: "models/Table/coffee_table_round_01_1k.gltf"
    },
    {
        name: 'lampModel',
        type: "gltfModel",
        path: "models/Lamp/Lantern_01_1k.gltf"
    },
    {
        name: 'streetLampModel',
        type: "gltfModel",
        path: "models/StreetLight/scene.gltf"
    }
]
