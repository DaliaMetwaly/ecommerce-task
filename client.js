/* eslint-disable no-console */
const socket = require('socket.io-client')('http://localhost:3000');
// const socket = require('socket.io-client')('http://vp-sync-staging.herokuapp.com/');

// let's assume that the client page, once rendered, knows what room it wants to join
const guid = 'abc123_guid2020';
const token = 'abc123_token2020';
const entityId = '0c24ae4e-beec-38d9-a7ed-6ea76f66b6cx';

socket.on('connect', () => {
  console.log('connected done');

  // Connected, let's sign-up for to receive messages for this room
  socket.emit('register', {
    entityId, token, guid,
  });

  // this code can be run when the client going online after being offline or for full sync
  setTimeout(() => {
    // hey server please send all data I do no have
    const tables = ['visits',
      'admin_preference',
      'areas',
      'department',
      'entities',
      'entity_user',
      'input_methods',
      'kiosks',
      'kiosk_setting',
      'roles',
      'scans',
      'scan_data_types',
      'settings',
      'sites',
      'users',
      'user_types',
      'user_type_setting',
      'visits',
    ];
    tables.forEach((element) => {
      socket.emit('syncRequest', {
        table: element,
        entityId,
        token,
        guid,
        syncType: 'full',
      });
    });
  }, 3000);
});

// in case of error
socket.on('error', (evData) => {
  console.error('Connection Error:', evData);
});

socket.on('syncReply', (data, callback) => {
  console.log('-------------------');
  // console.log(`syncReply done: ${data.table}`);
  if (data.records) console.log(`syncReply records.length: ${data.records.length}`);
  else console.log('syncReply records.error');
  // console.log('Socket (server-side): date to be saved in my local db:', data);
  const records = [];
  if (data.records) {
    data.records.forEach((element) => {
      records.push(element.id);
    });
  }
  // console.log('please mark this data as synced:', records);
  callback(records);
});

socket.on('pushActivity', (data) => {
  console.log('-------------------');
  console.log(`push-reply done: ${JSON.stringify(data.changes)}`);
});
