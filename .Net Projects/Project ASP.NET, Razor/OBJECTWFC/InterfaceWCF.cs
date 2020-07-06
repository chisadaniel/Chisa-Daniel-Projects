using System;
using System.ServiceModel;
using PROIECT_GALERIE;
using System.Runtime.Serialization;

namespace OBJECTWFC
{
    [ServiceContract]
    interface InterfaceMediaProperties
    {

        
        [OperationContract]
        void InsertColection(String[] mediaObjects);
        [OperationContract]
        void InsertProperty(string name, string property);
        [OperationContract]
        string[] GetAll();
        [OperationContract]
        string[] GetVideos();
        [OperationContract]
        string[] GetDescpritionsOfAnItem(string name);
        [OperationContract]
        int AddNewDescription(string name, string property);
        [OperationContract]
        void UpdateDescription(string name, string old_description, string new_description);
        [OperationContract]
        void DeleteDescriptionOfItem(string name, string description);
        [OperationContract]
        string[] GetElementFromSearch(string search_text);
        [OperationContract]
        void DeleteElementFromDb(string name);
        [OperationContract]
        string[] GetWarnings();
    }

    [ServiceContract]
    interface IMediaProperties : InterfaceMediaProperties
    {
    }

}
