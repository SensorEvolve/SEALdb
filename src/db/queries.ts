export const QUERIES = {
  GET_FIGHTERS: 'SELECT *, "fighter" as category FROM russian_fighters',
  GET_HELICOPTERS:
    'SELECT *, "helicopter" as category FROM russian_helicopters',
  GET_TRANSPORT:
    'SELECT *, "transport" as category FROM russian_transport_aircraft'
};
