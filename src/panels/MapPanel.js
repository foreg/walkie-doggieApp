import React from "react"
import { Panel, PanelHeader } from '@vkontakte/vkui';
class MapPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            id: this.props.id
        });
        this.handleLoad = this.handleLoad.bind(this);
    }
    componentDidMount() {
        this.handleLoad();
    }

    handleLoad(e) {
        var link = this;
        window.ymaps.ready(() => {
            var ymaps = window.ymaps;
            var map = new ymaps.Map('map',
                {
                    center: [57.15, 65.54],
                    zoom: 15,
                    controls: ['zoomControl']
                });
            ymaps.geolocation.get(
                {
                    provider: 'auto',
                    mapStateAutoApply: true// eslint-disable-next-line
                }).
                then(function (result) {
                    map.setCenter(result.geoObjects.position, 15);
                });
            var om = window.om;
            om = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 32,
                clusterDisableClickZoom: true
            });
            om.objects.options.set('preset', 'islands#greenDogIcon');
            om.clusters.options.set('preset', 'islands#greenClusterIcons');
            map.geoObjects.add(om);

            window.$.ajax// eslint-disable-next-line
                ({
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.walkie-doggie.ru/api/walkData",
                    "method": "GET",
                    "data": {},
                    // method: 'GET',
                    // url: 'https://www.walkie-doggie.ru/api/walkData',
                    // //url: 'http://127.0.0.1:8000/api/walkData?callback',
                    // //contentType: 'application/json',
                    // //xhrFields: {
                    // // withCredentials: false
                    // //},
                    // //jsonpCallback: 'callback',
                    // crossDomain: true,
                    // //dataType: "jsonp",
                    success: function (data) {
                        om.add(data);
                        //
                        om.events.add(['balloonopen'], (e) => {
                            document.getElementById('takeBTN').onclick = onButtonTakeClick;
                        });
                        //console.log(link);
                        function onButtonTakeClick(e) {
                            var walkId = document.getElementById('takeBTN').name;
                            var vkId = link.props.fetchedUser.id;
                            //fetch("http://127.0.0.1:8000/api/SetWalker", {
                            fetch("https://www.walkie-doggie.ru/api/SetWalker", {
                                method: 'POST',
                                headers: {
                                    //'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'application/json',
                                    //'Accept': 'application/json',                  
                                },
                                body: JSON.stringify({
                                    id: vkId,
                                    walk: walkId,
                                })
                            }).then(response => response.json())
                                .then(
                                    (result) => {
                                        console.log(result);

                                    },
                                    (error) => {
                                    })
                        }
                    }
                });
        });
    }
    render() {
        // var map;
        // ymaps.ready(init);
        // function init() {
        //     var map = new ymaps.Map("map",
        //         {
        //             center: [55.76, 37.64],
        //             zoom: 11,
        //             controls: ['zoomControl']
        //         });

        //     ymaps.geolocation.get(
        //         {
        //             provider: 'auto',
        //             mapStateAutoApply: true
        //         }).
        //         then(function (result) {
        //             map.setCenter(result.geoObjects.position, 12);
        //         });

        //     om = new ymaps.ObjectManager({
        //         clusterize: true,
        //         gridSize: 32,
        //         clusterDisableClickZoom: true
        //     });

        //     om.objects.options.set('preset', 'islands#greenDogIcon');
        //     om.clusters.options.set('preset', 'islands#greenClusterIcons');
        //     map.geoObjects.add(om);

        // $.ajax
        //     ({
        //         type: 'GET',
        //         //url: 'https://www.walkie-doggie.ru/public/getCoordsJSONP',
        //         url: 'https://127.0.0.1:8000/api/walkData',
        //         //contentType: 'text/plain',
        //         // xhrFields: {
        //         // withCredentials: false
        //         // },
        //         jsonpCallback: 'callback',
        //         //crossDomain: true,
        //         dataType: "jsonp",
        //         success: function (data) {
        //             om.add(data);
        //         }
        //     });
        //}
        return (

            <Panel id={this.state.id}>
                <PanelHeader>Заявки на выгул</PanelHeader>
                <div id="map" style={{ width: "auto", height: "100vh" }}></div>
                {/* <Map onAPIAvailable={(e) => this.MapHandler(e)} center={[55.754734, 37.583314]} zoom={10}>
                    <Marker lat={this.props.lat} lon={this.props.lon} />
                </Map> */}
            </Panel>
        )
    }
}
export default MapPanel