(function () {

    var setLoop = setInterval(function () {
        location.reload();
    }, 300000)

    const socket = new WebSocket('ws://mhg-lt047:8989/connect');
    var cradleArr = [];

    socket.addEventListener('message', (m) => {

        var arg = JSON.parse(m.data);

        new CradleCube(arg.name, arg.state, arg.conType)
    })

    function CradleCube(name, state, conType) {
        this.name = name;
        this.state = state;
        this.conType = conType;
        this.makeCube();
    }

    CradleCube.prototype.makeCube = function () {

        if (this.name.length === 3) {
            var content = document.getElementById('content'),
                cube = document.createElement('div'),
                name = document.createElement('span'),
                state = document.createElement('span'),
                conType = document.createElement('span');

            cube.classList.add('cube');
            name.innerText = this.name;
            name.classList.add('name');
            state.innerText = this.state;
            (this.state === "online") ? state.classList.add('online') : state.classList.add('offline');
            state.classList.add('state');
            conType.innerText = this.conType;
            conType.classList.add('conType');

            content.appendChild(cube);
            cube.appendChild(name);
            cube.appendChild(state);
            cube.appendChild(conType);

         
        }
    }
})();