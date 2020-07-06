using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Rendering;
 
namespace GalleryApp.Pages
{
    public class IndexModel : PageModel
    {
        public List<string> Items { get; set; }
        public List<string> Descriptions { get; set; }
        public List<string> TagsForEachImage = new List<string>();
        public List<string> Properties = new List<string>();
        public List<string> Searches = new List<string>();
        public List<string> ImageTitles = new List<string>();


        [BindProperty(SupportsGet =true)]
        public string SearchString { get; set; }
        
        public async Task OnGetAsync()
        {
              
            ServiceReference.MediaPropertiesClient client = new ServiceReference.MediaPropertiesClient();
            string[] paths = await client.GetAllAsync();
            Items = paths.Where(item => item != null).ToList();   //Store path of all media elements
          
            //Get all properties from gallery(are shown first time in page)
            foreach(var item in Items)
            {
                var name = System.IO.Path.GetFileName(item);
                string[] x = await client.GetDescpritionsOfAnItemAsync(name);
                List<string> validProperties = x.Where(item => item != null).ToList();
                foreach(string property in validProperties)
                {
                    Properties.Add(property);                                    
                }  
            }

            //Sort alphabetically those properties
            Properties.Sort();
            //Get only distinct tags
            Properties = Properties.Distinct().ToList();

            //Search bar functionality
            if (!string.IsNullOrEmpty(SearchString))
            {   
                //Perform search for items who match search criteria from SearchString
                string[] searchedItems = await client.GetElementFromSearchAsync(SearchString);
                List<string> searchResults = searchedItems.Where(item => item != null).ToList();
                foreach (string item in searchResults)
                {
                    //Add images to Searches List
                    Searches.Add(item);                   
                    ImageTitles.Add(System.IO.Path.GetFileName(item));
                }

                //Get tags(properties) for each image who matches search criteria
                foreach (var item in Searches)
                {   
                    //get the name of an image from image path 
                    var name = System.IO.Path.GetFileName(item);
                    string[] x = await client.GetDescpritionsOfAnItemAsync(name);
                    List<string> imageProperties = x.Where(item => item != null).ToList();
                    string description = "";
                    foreach (string property in imageProperties)
                    {   
                        //Group all properties for one image
                        description += "#" + property.ToString()+" ";
                    }
                    //Add properties to this list used on page to show all properties for one image who matches the search criteria
                    TagsForEachImage.Add(description);
                }
            }           
        }
    }
}
