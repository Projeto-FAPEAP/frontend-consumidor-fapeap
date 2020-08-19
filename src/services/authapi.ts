import axios from 'axios';

const acessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTc3NTg2MTAsImV4cCI6MTYwMDM1MDYxMCwic3ViIjoiZDBmODlhNDktOTIyZi00M2M3LWJhMGQtMjBlNzZlMTRkMTY2In0.GB_mnv5tCeFEPLt1jTJBcq0nBwgFqzOhu4JBi6_wdPk';

const authApi = axios.create({
    baseURL: 'https://fapeap.colares.net.br',
    headers:{
        Authorization: `Bearer ${acessToken}`
    } 
});

export default authApi;