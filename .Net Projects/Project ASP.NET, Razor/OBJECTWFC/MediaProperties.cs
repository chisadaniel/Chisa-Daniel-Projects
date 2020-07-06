using System;
using PROIECT_GALERIE;
using static PROIECT_GALERIE.TryConnect;

namespace OBJECTWFC
{

    //Class that implements all methods from IMediaProperties interface
    public class MediaProperties : IMediaProperties
    {
        void InterfaceMediaProperties.InsertColection(String[] mediaObjects)
        {
            TryConnect obj = new TryConnect();
            obj.InsertColection(mediaObjects);
        }
        void InterfaceMediaProperties.InsertProperty(string name, string property)
        {
            TryConnect obj = new TryConnect();
            obj.InsertProperty(name, property);
        }
        string[] InterfaceMediaProperties.GetAll()
        {
            TryConnect obj = new TryConnect();
            return obj.GetAll();
        }
        string[] InterfaceMediaProperties.GetVideos()
        {
            TryConnect obj = new TryConnect();
            return obj.GetVideos();
        }
        string[] InterfaceMediaProperties.GetDescpritionsOfAnItem(string name)
        {
            TryConnect obj = new TryConnect();
            return obj.GetDescpritionsOfAnItem(name);
        }
        int InterfaceMediaProperties.AddNewDescription(string name, string property)
        {
            TryConnect obj = new TryConnect();
            return obj.AddNewDescription(name, property);
        }
        void InterfaceMediaProperties.UpdateDescription(string name, string old_description, string new_description)
        {
            TryConnect obj = new TryConnect();
            obj.UpdateDescription(name, old_description, new_description);
        }
        void InterfaceMediaProperties.DeleteDescriptionOfItem(string name, string description)
        {
            TryConnect obj = new TryConnect();
            obj.DeleteDescriptionOfItem(name, description);
        }
        string[] InterfaceMediaProperties.GetElementFromSearch(string search_text)
        {
            TryConnect obj = new TryConnect();
            return obj.GetElementFromSearch(search_text);
        }
        void InterfaceMediaProperties.DeleteElementFromDb(string name)
        {
            TryConnect obj = new TryConnect();
            obj.DeleteElementFromDb(name);
        }
        string[] InterfaceMediaProperties.GetWarnings()
        {
            TryConnect obj = new TryConnect();
            return obj.GetWarnings();
        }
    }
}
