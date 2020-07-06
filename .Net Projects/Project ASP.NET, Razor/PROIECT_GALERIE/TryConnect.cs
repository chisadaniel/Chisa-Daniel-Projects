using System;
using System.Linq;


namespace PROIECT_GALERIE
{
    public class TryConnect
    {   

        //Function that inserts a list of media files(mediaObjects) into database
        public void InsertColection(String[] mediaObjects)
        {
            foreach (string file in mediaObjects)
            {
                if (file != null)
                {
                    string path = file;
                    string name = System.IO.Path.GetFileName(path);
                    using (var con = new GalerieContainer())
                    {
                        var query = from b in con.MediaSet
                                    orderby b.Name
                                    select b;
                        int ok = 1;
                        foreach (var item in query)
                        {
                            if (item.Name == name)
                            {
                                ok = 0;
                            }
                        }
                        if (ok == 1)
                        {

                            var photo = new Media { Name = name, Path = path };
                            con.MediaSet.Add(photo);
                            con.SaveChanges();
                        }
                    }
                }
            }
        }


        //Function that inserts a new description to an media object
        public void InsertProperty(string name,string property)
        {
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;
                 
                int id = -99;
                foreach (var item in query)
                {
                    if (item.Name == name)
                    {
                        id = item.Id;
                    }
                }

                var query2 = from b in con.PropertiesSet
                            orderby b.MediaId
                            select b;
                int ok = 1;
                foreach (var item in query2)
                {
                    if (item.Description == property && item.MediaId == id)
                    {
                        ok = 0;
                    }
                }

                if (ok == 1)
                {

                    var prop = new Properties { Description = property, MediaId = id };
                    con.PropertiesSet.Add(prop);
                    con.SaveChanges();
                }
            }
        }


        //Function that returns all media objects contained in database
        public string[] GetAll()
        { 
            String[] all = new String[100];  
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;
                int index = 0;
                foreach (var item in query)
                {//item.Name.Contains(".mp4") ||
                    if ( item.Name.Contains(".avi") || item.Name.Contains(".wmv") || item.Name.Contains(".mov" ))
                    {

                    }
                    else 
                    {
                        all[index] = (String)item.Path;
                        index += 1;
                    }
                }
            }
            return all;
        }


        //Function that return all videos from database
        public string[] GetVideos()
        {
            String[] all = new String[100];
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;
                int index = 0;
                foreach (var item in query)
                {
                    if (item.Name.Contains(".mp4") || item.Name.Contains(".avi") || item.Name.Contains(".wmv") || item.Name.Contains(".mov"))
                    {
                        all[index] = (String)item.Path;
                        index += 1;
                    }
                     
                }
            }
            return all;
        }


        //Function that returns all descriptions for an certain media object identified by name 
        public string[] GetDescpritionsOfAnItem(string name)
        {
            string[] desc = new string[50];
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;

                int id = -99;
                foreach (var item in query)
                {
                    if (item.Name == name)
                    {
                        id = item.Id;
                    }
                }

                var query2 = from b in con.PropertiesSet
                             orderby b.MediaId
                             select b;
                int index = 0;
                foreach (var item in query2)
                {
                    if ( item.MediaId == id)
                    {
                        desc[index] = item.Description;
                        index += 1;
                    }
                }
            }
            return desc;
        }


        //Function that insert into database a new description to an certain media object identified by its name
        public int AddNewDescription(string name, string property)
        {
            int flag = 1;
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;

                int id = -99;
                foreach (var item in query)
                {
                    if (item.Name == name)
                    {
                        id = item.Id;
                    }
                }

                var query2 = from b in con.PropertiesSet
                             orderby b.MediaId
                             select b;
                
                foreach (var item in query2)
                {
                    if (item.Description == property && item.MediaId == id)
                    {
                        flag = 0;
                        return 0;
                    }
                }
                if(flag == 1)
                {
                    var prop = new Properties { Description = property, MediaId = id };
                    con.PropertiesSet.Add(prop);
                    con.SaveChanges();
                }
            }
            return flag;
        }


        //Function that update an media object description
        public void UpdateDescription(string name, string old_description, string new_description)
        {
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;

                int id = -99;
                foreach (var item in query)
                {
                    if (item.Name == name)
                    {
                        id = item.Id;
                    }
                }

                var result = (from p in con.PropertiesSet
                              where p.Description == old_description && p.MediaId == id
                              select p).SingleOrDefault();
                result.Description = new_description;
                con.SaveChanges();
            }
        }


        //Function that delete a description of an media object  
        public void DeleteDescriptionOfItem(string name,string description)
        {
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;

                int id = -99;
                foreach (var item in query)
                {
                    if (item.Name == name)
                    {
                        id = item.Id;
                    }
                }

                var result =  from p in con.PropertiesSet
                              where p.Description == description && p.MediaId == id
                              select p;
                foreach(var detail in result)
                {
                    con.PropertiesSet.Remove(detail);
                }
                con.SaveChanges();
            }
        }


        //Function that return the results for the searching bar
        public string[] GetElementFromSearch(string search_text)
        {
            string[] results = new string[50];

            search_text = search_text.ToLower();
            int[] ids = new int[100];
            int index_ids = 0;
           
            
            int index_results = 0;
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;

                
                foreach (var item in query)
                {
                    if (item.Name.ToLower().Contains(search_text) || item.Path.ToLower().Contains(search_text))
                    {

                        results[index_results] = item.Path;
                        index_results += 1;
                        ids[index_ids] = item.Id;
                        index_ids += 1;
                    }

                   
                }

                var result = from p in con.PropertiesSet
                             orderby p.Description
                             select p;
                foreach(var item in result)
                {
                    if (item.Description.ToLower().Contains(search_text))
                    {
                        if (!ids.Contains(item.MediaId))
                        {
                            ids[index_ids] = item.MediaId;
                            index_ids += 1;
                        }
                    }
                }
                var query3 = from b in con.MediaSet
                            orderby b.Id
                            select b;
                foreach (int id in ids)
                {
                    foreach(var item in query3)
                    {
                        if(item.Id == id && !results.Contains(item.Path))
                        {
                            results[index_results] = item.Path;
                            index_results += 1;
                        }
                    }
                }

                return results;
            }
        }


        //Function that deletes an item from database
        public void DeleteElementFromDb(string name)
        {
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Name
                            select b;

                int id = -99;
                foreach (var item in query)
                {
                    if (item.Name == name)
                    {
                        id = item.Id;
                    }
                }

                var result2 = from p in con.MediaSet
                             where p.Id == id
                             select p;
                foreach (var detail in result2)
                {
                    con.MediaSet.Remove(detail);
                }
                


                var result = from p in con.PropertiesSet
                             where p.MediaId == id
                             select p;
                foreach (var detail in result)
                {
                    con.PropertiesSet.Remove(detail);
                }
                con.SaveChanges();
            }
        }


        //Function that search for media objects which have a different path from the initial one
        public string[] GetWarnings()
        {
            string[] warnings = new string[100];
            int index = 0;
            using (var con = new GalerieContainer())
            {
                var query = from b in con.MediaSet
                            orderby b.Path
                            select b;

               
                foreach (var item in query)
                {
                    if (System.IO.File.Exists(item.Path) == false)
                    {
                        warnings[index] = item.Path;
                    }
                }
            }

                return warnings;
        }
    }

}



