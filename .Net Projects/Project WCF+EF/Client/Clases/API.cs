using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PROIECT_GALERIE;

namespace GUI_form
{
    
    public class API
    {
        //public TryConnect data = new TryConnect();
        public MediaPropertiesClient data = new MediaPropertiesClient();
        public void Insert(String [] objects)
        {
            data.InsertColection(objects);
        }
        public void InsertSingleProperty(string name,string property)
        {
            data.InsertProperty(name, property);
        }
        public string[] GetAllGalleryItems()
        {
            String[] all = new string[100];
            data.GetAll().CopyTo(all,0);
            return all;
        }
        public string[] GetVideosGalleryItems()
        {
            String[] all = new string[100];
            data.GetVideos().CopyTo(all, 0);
            return all;
        }
        public string[] GetDescriptionOfItem(string name)
        {
            string[] descriptions = new string[50];
            data.GetDescpritionsOfAnItem(name).CopyTo(descriptions,0);
            return descriptions;
        }
        public int AddNewDescription(string name, string property)
        {
           int flag = data.AddNewDescription(name, property);
           return flag;
        }
        public void UpdateThisDescriptionOfItem(string name,string old_description, string new_description)
        {
            data.UpdateDescription(name, old_description, new_description);
        }
        public void DeleteDescription(string name,string description)
        {
            data.DeleteDescriptionOfItem(name, description);
        }
        public string[] Search(string search_text)
        {       
            return(data.GetElementFromSearch(search_text));
            
        }
        public void DeleteItem(string name)
        {
            data.DeleteElementFromDb(name);
        }
        public string[] GetMyWarnings()
        {
            string[] warn = new string[100];
            data.GetWarnings().CopyTo(warn, 0);
            return warn;
        }
    }
}
