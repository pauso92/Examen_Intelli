import Head from 'next/head'
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import { route } from 'next/dist/next-server/server/router';
import {useRouter} from 'next/router';
import Link from 'next/link';


const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor{
    id
    nombre
    apellido
    email
    edad
  }
}
`;

const Index = () => {

  const router = useRouter();

  //Consulta de usuarios
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  console.log(data)
  console.log(loading)
  console.log(error)

  if (loading) return 'Cargando ...'

  if(!data.obtenerClientesVendedor) {
    return router.push('/login');
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gary-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hove: bg-gray-800 mb-3 uppercase font-bold">Nuevo Cliente</a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-log">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Edad</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map(cliente => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.nombre} {cliente.apellido}</td>
                <td className="border px-4 py-2">{cliente.edad} </td>
                <td className="border px-4 py-2">{cliente.email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Index;
