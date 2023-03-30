import homeService from "./home.service";

export function items() {
    // const response = await homeService.getItems('select');
    // console.log(response);
    // const data = await response.json();
    return [];
}


export const locations = [
    { id: "", name: 'Please select location' },
    { id: '1', name: 'godown1' },
    { id: '2', name: 'Cinnakuyili' },
    { id: '3', name: 'godown3' },
    { id: '4', name: 'godown4' },
    { id: '5', name: 'godown5' },
    { id: '6', name: 'godown6' },
]

export const suppliers = [
    { id: "", name: 'Please select supplier' },
    { id: '1', name: 'Kattampatty1' },
    { id: '2', name: 'Ramakrishnan coirs' },
    { id: '3', name: 'midapadi' },
    { id: '4', name: 'Negamam' },
    { id: '5', name: 'Vadasithur' },
    { id: '6', name: 'Kattampatty2' },
]


export const qcNames = [
    { id: "", name: 'Please select Qc name' },
    { id: '1', name: 'Rajadurai' },
    { id: '2', name: 'saravanan' },
    { id: '3', name: 'srikanth' },
    { id: '4', name: 'pantiyan' },
    { id: '5', name: 'Raja' },
    { id: '6', name: 'Selva' },
]


export const storage_locations = [
    { id: "", name: 'Please select Storage Location' },
    { id: '1', name: 'M/C Hall I, II' },
    { id: '2', name: 'M/C Hall I' },
    { id: '3', name: 'M/C Hall II' },
    { id: '4', name: 'GODOWN II' },
    { id: '5', name: 'GODOWN I' },
]