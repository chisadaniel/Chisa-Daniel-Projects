using System;
using OBJECTWFC;
using System.ServiceModel;
using System.ServiceModel.Description;

namespace HostWCF
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Se lanseaza serverul WCF...");
            ServiceHost host = new ServiceHost(typeof(MediaProperties), new Uri("http://localhost:8000/PC"));
            foreach (ServiceEndpoint se in host.Description.Endpoints)
                Console.WriteLine(se.Address.ToString(), se.Binding.Name.ToString(), se.Contract.Name.ToString());
            host.Open();
            Console.WriteLine("Server WCF este in executie. Se asteapta conexiuni...");
            Console.WriteLine("Apasati Enter pentru a opri serverul!");
            Console.ReadKey();
            host.Close();
        }
    }
}
