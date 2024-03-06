import Link from 'next/link';


export default function Header({userName}) {
  
  return (
    <div className="navbar bg-base-100 flex flex-wrap min-w-[320px]">
      <div className="flex-1">
        <h1 className="normal-case text-xl">
          Bienvenido {userName}
        </h1>
      </div>
        
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          
          <Link className="bg-gray-200 text-gray-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded-md py-2 px-4" href="/admin">
            Admin
          </Link>
          <Link className="bg-gray-200 text-gray-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded-md py-2 px-4" href="/cliente/norte">
            Ordenar
          </Link>
          <Link className="bg-gray-200 text-gray-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded-md py-2 px-4" href="/matrix">
            Pedidos
          </Link>
          
        </ul>
      </div>
    
    </div>
  
  );
}
