// tests the RocketCard component
import React from 'react';
import renderer from 'react-test-renderer';
import { RocketCard } from '../../src/components/RocketCard';
import { Launch } from '../../src/model/models';



const launch: Launch = {
    "fairings": {
        "reused": false,
        "recovery_attempt": false,
        "recovered": false,
        "ships": []
    },
    "links": {
        "patch": {
            "small": "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
            "large": "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png"
        },
        "reddit": {
            "campaign": null,
            "launch": null,
            "media": null,
            "recovery": null
        },
        "flickr": {
            "small": [],
            "original": []
        },
        "presskit": null,
        "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
        "youtube_id": "0a_00nJ_Y88",
        "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
        "wikipedia": "https://en.wikipedia.org/wiki/DemoSat"
    },
    "static_fire_date_utc": "2006-03-17T00:00:00.000Z",
    "static_fire_date_unix": "1142553600",
    "net": false,
    "window": 0,
    "rocket": "5e9d0d95eda69955f709d1eb",
    "success": false,
    "failures": [
        {
            "time": 33,
            "altitude": null,
            "reason": "merlin engine failure"
        }
    ],
    "details": "Engine failure at 33 seconds and loss of vehicle",
    "crew": [],
    "ships": [],
    "capsules": [],
    "payloads": [
        "5eb0e4b5b6c3bb0006eeb1e1"
    ],
    "launchpad": "5e9e4502f5090995de566f86",
    "flight_number": 1,
    "name": "FalconSat",
    "date_utc": "2006-03-24T22:30:00.000Z",
    "date_unix": "1143239400",
    "date_local": "2006-03-25T10:30:00+12:00",
    "date_precision": "hour",
    "upcoming": false,
    "cores": [
        {
            "core": "5e9e289df35918033d3b2623",
            "flight": 1,
            "gridfins": 1,
            "legs": false,
            "reused": false,
            "landing_attempt": false,
            "landing_success": false,
            "landing_type": "",
            "landpad": ""
        }
    ],
    "auto_update": true,
    "id": "5eb87cd9ffd86e000604b32a",
    "tdb": false
}







const mockProps = {
  item: launch,
  onTap: jest.fn()
};

describe('RocketCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RocketCard {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
