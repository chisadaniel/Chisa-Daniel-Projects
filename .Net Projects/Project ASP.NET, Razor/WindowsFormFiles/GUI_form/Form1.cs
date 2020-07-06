using System;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Windows.Forms;
namespace GUI_form
{
    public partial class Form1 : Form
    {

       
        private API api = new API();
        private String[] imagesPaths = new String[100];
        private String[] videosPaths = new string[100];
        private String[] allGallery = new String[300];
        private String[] videosGallery = new string[100];
        private String[] descriptions = new string[50];
        private String[] searched_results = new string[50];
        private String[] selected_items = new string[500];
        private int selected_index = 0;
        private int search_index = 0;
        private int allIndex = 0;
        private int indexVideosGallery = 0;
        private int indexGallery = 0;
        private int videoGallery = 0;
        private bool all=false;
        private bool videosFlag = false;
        private bool selectAllPressed = false;
        private String[] warnings = new string[100];
       
        
        public Form1()
        {
            InitializeComponent();
            api.GetMyWarnings().CopyTo(warnings, 0);
            CheckIfWarnings(warnings);
        }


        //Function that check if there are media objects with changed path from the initial one
        //If so the set warning button visible
        private void CheckIfWarnings(string[] warn)
        {
            int CountWarnings = warn.Count(val => val != null);
            if (CountWarnings > 0) { warningBtn.Visible = true; }
            else
            {
                warningBtn.Visible = false;
            }
        }


        //Function that imports images into database
        private void importImage_Click(object sender, EventArgs e)
        {
            ImportImageBtn.Cursor = Cursors.AppStarting;
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.Filter = "Files | *.png;*.jpg;*.jpeg;";
            dialog.Multiselect = true;
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                TitleLabel.Text = "Image:";
                pictureBox1.Visible = true;
                importVideoBox.Visible = false;
               // imagesPaths = new String[] { dialog.FileNames };
                int index = 0;
                foreach (String file in dialog.FileNames)
                {
                    imagesPaths[index] = file;
                    index += 1;
                }
                    api.Insert(imagesPaths);
                    importedLabel.Text = index.ToString() + " photos was added to gallery!";
                    String path = imagesPaths[0];
                    Bitmap MyImage = new Bitmap(path);
                    pictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
                    pictureBox1.ClientSize = new Size(249, 199);
                    pictureBox1.Image = (Image)MyImage;
                    String imageTitle = System.IO.Path.GetFileName(path);
                    ImageTitle.Text = imageTitle;
                    
            }
            
            ImportImageBtn.Cursor = Cursors.Hand;

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }


        //Function that move to next image in import gallery section if picures was imported
        private void NextImage_Click(object sender, EventArgs e)
        {   
            if (pictureBox1.Visible == true)
            {
                indexGallery += 1;
                string path = imagesPaths[indexGallery];
                if (path != null)
                {
                    Bitmap MyImage = new Bitmap(path);
                    pictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
                    pictureBox1.ClientSize = new Size(249, 199);
                    pictureBox1.Image = (Image)MyImage;
                    String imageTitle = System.IO.Path.GetFileName(path);
                    ImageTitle.Text = imageTitle;
                }
                else
                {
                    indexGallery -= 1;
                }
            }
            //move to next video in import gallery section if videos was imported
            if (importVideoBox.Visible == true)
            {
                videoGallery += 1;
                string path = videosPaths[videoGallery];
                if (path != null)
                {
                    importVideoBox.URL = path;
                    String imageTitle = System.IO.Path.GetFileName(path);
                    ImageTitle.Text = imageTitle;
                }
                else
                {
                    videoGallery -= 1;
                }
            }

        }


        //Function that moves to previous image in import gallery section if pictures was impored
        private void PreviousImage_Click(object sender, EventArgs e)
        {
            if (pictureBox1.Visible == true)
            {
                if (indexGallery != 0)
                {
                    indexGallery -= 1;
                    string path = imagesPaths[indexGallery];

                    if (path != null)
                    {
                        Bitmap MyImage = new Bitmap(path);
                        pictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
                        pictureBox1.ClientSize = new Size(249, 199);
                        pictureBox1.Image = (Image)MyImage;
                        String imageTitle = System.IO.Path.GetFileName(path);
                        ImageTitle.Text = imageTitle;
                    }
                    else
                    {
                        indexGallery += 1;
                    }
                }
            }
            // moves to previous video in import gallery section if videos was imported
            if (importVideoBox.Visible == true)
                {
                    if (videoGallery != 0)
                    {
                        videoGallery -= 1;
                        string path = videosPaths[videoGallery];

                        if (path != null)
                        {
                            importVideoBox.URL = path;
                            String imageTitle = System.IO.Path.GetFileName(path);
                            ImageTitle.Text = imageTitle;
                        }
                        else
                        {
                            videoGallery += 1;
                        }
                    }
                }
        }


        //Function that import videos into database
        private void ImportVideo_Click(object sender, EventArgs e)
        {
            ImportVideo.Cursor = Cursors.AppStarting;
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.Filter = "Files | *.mp4;*.avi;*.wmv;*.mov;";
            dialog.Multiselect = true;
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                TitleLabel.Text = "Video:";
                pictureBox1.Visible = false;
                importVideoBox.Visible = true;
                
                int index = 0;
                foreach (String file in dialog.FileNames)
                {
                    videosPaths[index] = file;
                    index += 1;
                    
                }
                importedLabel.Text = index.ToString() + " videos was added to gallery!";
                api.Insert(videosPaths);
                String path = videosPaths[0];
                importVideoBox.URL = path;
                String videoTitle = System.IO.Path.GetFileName(path);
                ImageTitle.Text = videoTitle;
            }
           
            ImportVideo.Cursor = Cursors.Hand;
            
        }

        private void label1_Click_1(object sender, EventArgs e)
        {

        }


        //Function that opens the edit description form when a description is clicked
        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {      
            if (listBox1.SelectedItem != null)
            {
                 
                EditElementsForm f = new EditElementsForm();
                f.ShowDialog();
                if(f.DialogResult == DialogResult.OK)
                {
                    string newDescription = f.update_description;
                    f.Dispose();
                    api.UpdateThisDescriptionOfItem(galleryTitleLabel.Text,listBox1.SelectedItem.ToString(),newDescription);
                    MessageBox.Show("Description modified!");
                    listBox1.SelectedItem = newDescription;
                    
                }
                if(f.DialogResult == DialogResult.No)
                {   
                    f.Dispose();
                    MessageBox.Show("Description deleted!");
                    api.DeleteDescription(galleryTitleLabel.Text, listBox1.SelectedItem.ToString());
                    listBox1.Items.Remove(listBox1.SelectedItem);

                }
               
            }
           
        }


        //Function that add a new description to the current image/video
        private void AddProperty_Click(object sender, EventArgs e)
        {
            string property = EnterPropertyText.Text;
            string name = ImageTitle.Text;
            api.InsertSingleProperty(name, property);
            importedLabel.Text = "Description added to "+name+".";
            if(CheckIfPhoto(name)==true)
                allBtn.PerformClick();
            if(CheckIfPhoto(name)==false)
                videosBtn.PerformClick();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }


        //Function that clear the input from enter new descriprion
        private void newPropertyBtn_Click(object sender, EventArgs e)
        {
            EnterPropertyText.Text = "";
        }


        //Function that opens all images from database and put them into gallery section
        private void allBtn_Click(object sender, EventArgs e)
        {
            allBtn.Cursor = Cursors.AppStarting;
            if (videosFlag == true)
            {
                DescriptionsLabel.Visible = false;
                galleryNextBtn.Visible = false;
                galleryPreviousBtn.Visible = false;
                listBox1.Visible = false;
                deleteItem.Visible = false;
                galleryAddDescToItem.Visible = false;
                galleryVideoBox.Visible = false;
            }

            api.GetAllGalleryItems().CopyTo(allGallery,0);
            String path = allGallery[allIndex];
            if (path != null && System.IO.File.Exists(path))
            {
                DescriptionsLabel.Visible = true;
                emptyGalleryLabel.Visible = false;
                galleryNextBtn.Visible = true;
                galleryPreviousBtn.Visible = true;
                listBox1.Visible = true;
                galleryAddDescToItem.Visible = true;
                deleteItem.Visible = true;
                galleryPictureBox.Visible = true;
                galleryVideoBox.Visible = false;
                galleryVideoBox.close();
                Bitmap MyImage = new Bitmap(path);
                galleryPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                galleryPictureBox.ClientSize = new Size(538, 353);
                galleryPictureBox.Image = (Image)MyImage;
                string imageTitle = System.IO.Path.GetFileName(path);
                galleryTitleLabel.Text = imageTitle;
                Array.Clear(descriptions, 0, descriptions.Length);
                api.GetDescriptionOfItem(imageTitle).CopyTo(descriptions, 0);
                SetDescriptionList(descriptions);
                all = true;
            }
            else
            {
                //emptyGalleryLabel.Text = "NO PHOTOS IN THE GALLERY.";
                emptyGalleryLabel.Visible = true;
            }
            allBtn.Cursor = Cursors.Hand;
        }


        //Function that adds into descriptions section the descriptions of an image/video
        private void SetDescriptionList(string[] descriptions)
        {
            listBox1.Items.Clear();
            foreach(string desc in descriptions)
            {
                if (desc != null)
                {
                    listBox1.Items.Add(desc);
                }
            }
        }


        //Functions that moves to previos image/video in gallery section when previous button is clicked
        private void galleryPreviousBtn_Click(object sender, EventArgs e)
        {
            if(all == true && galleryPictureBox.Visible == true)
            {
                if (allIndex != 0)
                {
                    allIndex -= 1;
                    string path = allGallery[allIndex];

                    if (path != null && System.IO.File.Exists(path))
                    {
                        Bitmap MyImage = new Bitmap(path);
                        galleryPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                        galleryPictureBox.ClientSize = new Size(538, 353);
                        galleryPictureBox.Image = (Image)MyImage;
                        string imageTitle = System.IO.Path.GetFileName(path);
                        galleryTitleLabel.Text = imageTitle;
                        Array.Clear(descriptions, 0, descriptions.Length);
                        api.GetDescriptionOfItem(imageTitle).CopyTo(descriptions, 0);
                        SetDescriptionList(descriptions);
                    }
                    else
                    {
                        allIndex += 1;
                    }
                }
            }
            if (videosFlag == true && galleryVideoBox.Visible == true)
            {
                if (indexVideosGallery != 0)
                {
                    indexVideosGallery -= 1;
                    string path = videosGallery[indexVideosGallery];

                    if (path != null && System.IO.File.Exists(path))
                    {
                        galleryVideoBox.URL = path;
                        string imageTitle = System.IO.Path.GetFileName(path);
                        galleryTitleLabel.Text = imageTitle;
                        Array.Clear(descriptions, 0, descriptions.Length);
                        api.GetDescriptionOfItem(imageTitle).CopyTo(descriptions, 0);
                        SetDescriptionList(descriptions);
                    }
                    else
                    {
                        indexVideosGallery += 1;
                    }
                }
            }
        }

        
        //Function that moves to next photo/video in the gallery section when next button is clicked
        private void galleryNextBtn_Click(object sender, EventArgs e)
        {
            if(all == true && galleryPictureBox.Visible == true)
            {
                allIndex += 1;
                string path = allGallery[allIndex];
                if (path != null && System.IO.File.Exists(path))
                {
                    Bitmap MyImage = new Bitmap(path);
                    galleryPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                    galleryPictureBox.ClientSize = new Size(538, 352);
                    galleryPictureBox.Image = (Image)MyImage;
                    String imageTitle = System.IO.Path.GetFileName(path);
                    galleryTitleLabel.Text = imageTitle;
                    Array.Clear(descriptions, 0, descriptions.Length);
                    api.GetDescriptionOfItem(imageTitle).CopyTo(descriptions, 0);
                    SetDescriptionList(descriptions);
                }
                else
                {
                    allIndex -= 1;
                }
            }
            if (videosFlag == true && galleryVideoBox.Visible == true)
            {
                indexVideosGallery += 1;
                string path = videosGallery[indexVideosGallery];
                if (path != null && System.IO.File.Exists(path))
                {
                    galleryVideoBox.URL = path;
                    String imageTitle = System.IO.Path.GetFileName(path);
                    galleryTitleLabel.Text = imageTitle;
                    Array.Clear(descriptions, 0, descriptions.Length);
                    api.GetDescriptionOfItem(imageTitle).CopyTo(descriptions, 0);
                    SetDescriptionList(descriptions);
                }
                else
                {
                    indexVideosGallery -= 1;
                }
            }
        }

        
        //Function that adds videos into gallery section when videos button is clicked
        private void videosBtn_Click(object sender, EventArgs e)
        {
            videosBtn.Cursor = Cursors.AppStarting;
            if(all == true)
            {
                DescriptionsLabel.Visible = false;
                galleryNextBtn.Visible = false;
                galleryPreviousBtn.Visible = false;
                listBox1.Visible = false;
                deleteItem.Visible = false;
                galleryAddDescToItem.Visible = false;
                galleryPictureBox.Visible = false;
               // galleryVideoBox.Visible = false;
            }


            api.GetVideosGalleryItems().CopyTo(videosGallery, 0);
            String path = videosGallery[indexVideosGallery];
            if (path != null && System.IO.File.Exists(path))
            {
                galleryVideoBox.Visible = true;
               // galleryVideoBox.Show();
                DescriptionsLabel.Visible = true;
                emptyGalleryLabel.Visible = false;
                galleryNextBtn.Visible = true;
                galleryPreviousBtn.Visible = true;
                listBox1.Visible = true;
                deleteItem.Visible = true;
                galleryAddDescToItem.Visible = true;
                galleryPictureBox.Visible = false;

                 
                galleryVideoBox.URL = path;
                
                String videoTitle = System.IO.Path.GetFileName(path);
                ImageTitle.Text = videoTitle;
                string imageTitle = System.IO.Path.GetFileName(path);
                galleryTitleLabel.Text = imageTitle;
                Array.Clear(descriptions, 0, descriptions.Length);
                api.GetDescriptionOfItem(imageTitle).CopyTo(descriptions, 0);
                SetDescriptionList(descriptions);
                all = false;
                videosFlag = true;
            }
            else
            {
                //emptyGalleryLabel.Text = "NO VIDEOS IN THE GALLERY.";
                emptyGalleryLabel.Visible = true;
            }
            videosBtn.Cursor = Cursors.Hand;
        }


        //Function that adds a new description to current item displayed into gallery section when add new description is clicked
        private void galleryAddDescToItem_Click(object sender, EventArgs e)
        {
            AddNewProperty f2 = new AddNewProperty();
            f2.ShowDialog();


            string s;

            if (f2.DialogResult == DialogResult.OK)
            {
                //f2.Close();
                if (f2.setFlag == true)
                {
                    if (f2.property != "")
                    {
                        s = f2.property;
                        InsertNewDescription(s);
                        //MessageBox.Show("i have property",s);
                        //f2.Dispose();
                       // f2.Close();
                    }
                    else
                    {
                        MessageBox.Show("I dont have property");
                    }
                }
                f2.Dispose();
            }
            
        }


        //Function that update the new inserted description to descriptions section of the current item from gallery section
        private void InsertNewDescription(string property)
        {
            if(all == true)
            {
                string path = allGallery[allIndex];
                string name = System.IO.Path.GetFileName(path);
                int flag = api.AddNewDescription(name, property);
                if(flag == 0)
                {
                    MessageBox.Show("Description already exists!");
                }
                else
                {
                    listBox1.Items.Add(property);
                }
            }
            if (videosFlag == true)
            {
                string path = videosGallery[indexVideosGallery];
                string name = System.IO.Path.GetFileName(path);
                int flag = api.AddNewDescription(name, property);
                if (flag == 0)
                {
                    MessageBox.Show("Description already exists!");
                }
                else
                {
                    listBox1.Items.Add(property);
                }
            }
        }


        //Function that check is an object is either an image or video
        private bool CheckIfPhoto(string path)
        {
            if (path.Contains(".png") || path.Contains(".jpg") || path.Contains(".jpeg")) 
                return true;
           
            if (path.Contains(".mp4") || path.Contains(".avi") || path.Contains(".wmv")||path.Contains(".mov"))
                return false;
            return false;
        }


        //Function that makes call to  api to find items considering the search criterion
        private void FindBtn_Click(object sender, EventArgs e)
        {
            FindBtn.Cursor = Cursors.AppStarting;
            Array.Clear(selected_items, 0, selected_items.Length);

            nextSearchBtn.Visible = false;
            prevSearchBtn.Visible = false;
            searchPictureBox.Visible = false;
            searchVideoBox.Visible = false;
            resultsCountLabel.Visible = false;
            resultsCountLabel.Text = "";
            searchTitleLabel.Text = "";
            string search_text = searchBar.Text;
            if (search_text == "") return;
           // MessageBox.Show(search_text);
            this.search_index = 0;
            //searched_results = api.Search(search_text);
            Array.Clear(this.searched_results, 0, this.searched_results.Length);
            api.Search(search_text).CopyTo(this.searched_results, 0);
            resultsCountLabel.Visible = true;
            resultsCountLabel.Text = searched_results.Count(s => s != null).ToString() + " results found.";

            //MessageBox.Show(searched_results.Length.ToString());
            string path = this.searched_results[this.search_index];
            if (path == null) return;
            if (CheckIfPhoto(path) == true && System.IO.File.Exists(path))
            {
                nextSearchBtn.Visible = true;
                prevSearchBtn.Visible = true;
                searchPictureBox.Visible = true;
                searchVideoBox.Visible = false;
                searchVideoBox.close();
                Bitmap MyImage = new Bitmap(path);
                searchPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                searchPictureBox.ClientSize = new Size(300, 176);
                searchPictureBox.Image = (Image)MyImage;
                String title = System.IO.Path.GetFileName(path);
                searchTitleLabel.Text = title;
            }
            else if (CheckIfPhoto(path) == false && System.IO.File.Exists(path))
            {
                nextSearchBtn.Visible = true;
                prevSearchBtn.Visible = true;
                searchPictureBox.Visible = false;
                searchVideoBox.Visible = true;
                searchVideoBox.URL = path;
                String title = System.IO.Path.GetFileName(path);
                searchTitleLabel.Text = title;

            }
           FindBtn.Cursor = Cursors.Hand;
        }



        //Function that moves to next image/video in the search section
        private void nextSearchBtn_Click(object sender, EventArgs e)
        {
            search_index += 1;
            string path = searched_results[search_index];
            if (path == null) { 
                search_index -= 1;
                return;
            }

 
            if (CheckIfPhoto(path) == true && System.IO.File.Exists(path))
            {
                if (selected_items.Contains(searched_results[search_index]) == true) selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selectedTrue, new Size(55, 33)));                
                else selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selected, new Size(55, 33)));

                searchPictureBox.Visible = true;
                searchVideoBox.Visible = false;
                searchVideoBox.close();
                Bitmap MyImage = new Bitmap(path);
                searchPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                searchPictureBox.ClientSize = new Size(300, 176);
                searchPictureBox.Image = (Image)MyImage;
                String title = System.IO.Path.GetFileName(path);
                searchTitleLabel.Text = title;
                //String imageTitle = System.IO.Path.GetFileName(path);
                //galleryTitleLabel.Text = imageTitle;



            }
            else if (CheckIfPhoto(path) == false && System.IO.File.Exists(path))
            {
                if (selected_items.Contains(searched_results[search_index]) == true) selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selectedTrue, new Size(55, 33)));
                else selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selected, new Size(55, 33)));
                searchPictureBox.Visible = false;
                searchVideoBox.Visible = true;
                searchVideoBox.close();
                searchVideoBox.URL = path;
                String title = System.IO.Path.GetFileName(path);
                searchTitleLabel.Text = title;
            }
            else search_index -= 1;
        }



        //Function that moves to previous image/video in search section when previous button is clicked
        private void prevSearchBtn_Click(object sender, EventArgs e)
        {
            if (search_index != 0)
            {
                search_index -= 1;
                string path = searched_results[search_index];
                if (path == null) return;
                if (CheckIfPhoto(path) == true && System.IO.File.Exists(path))
                {
                    if (selected_items.Contains(searched_results[search_index]) == true) selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selectedTrue, new Size(55, 33)));
                    else selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selected, new Size(55, 33)));
                    searchPictureBox.Visible = true;
                    searchVideoBox.Visible = false;
                    searchVideoBox.close();
                    Bitmap MyImage = new Bitmap(path);
                    searchPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                    searchPictureBox.ClientSize = new Size(300, 176);
                    searchPictureBox.Image = (Image)MyImage;
                    String title = System.IO.Path.GetFileName(path);
                    searchTitleLabel.Text = title;
                    //String imageTitle = System.IO.Path.GetFileName(path);
                    //galleryTitleLabel.Text = imageTitle;
                }
                else if (CheckIfPhoto(path) == false && System.IO.File.Exists(path))
                {
                    if (selected_items.Contains(searched_results[search_index]) == true) selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selectedTrue, new Size(55, 33)));
                    else selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selected, new Size(55, 33)));
                    searchPictureBox.Visible = false;
                    searchVideoBox.close();
                    searchVideoBox.Visible = true;
                    searchVideoBox.URL = path;
                    String title = System.IO.Path.GetFileName(path);
                    searchTitleLabel.Text = title;
                }
                else search_index += 1;
            }
        }



        //Function that clear search section when search bar text is changed
        private void searchBar_TextChanged(object sender, EventArgs e)
        {
            //MessageBox.Show(galleryVideoBox.Visible.ToString());
            resultsCountLabel.Text = "";
            nextSearchBtn.Visible = false;
            prevSearchBtn.Visible = false;
            searchPictureBox.Visible = false;
            searchVideoBox.Visible = false;
            searchTitleLabel.Text = "";
            Array.Clear(selected_items, 0, selected_items.Length);
        }



        //Function that makes call to api to delete an object/image from database
        private void deleteItem_Click(object sender, EventArgs e)
        {
          
             
            string message = "Do you want to delete "+galleryTitleLabel.Text+" ?";
            string caption = "DELETE";
            MessageBoxButtons buttons = MessageBoxButtons.YesNo;
            DialogResult result;

            result = MessageBox.Show(message, caption, buttons);
            if (result == System.Windows.Forms.DialogResult.Yes)
            {
                
                //this.Close();
                api.DeleteItem(galleryTitleLabel.Text);
               
                if (all == true)
                {
                    int count_elements = allGallery.Count(s => s != null);
                     
                    allGallery = allGallery.Where(val => System.IO.Path.GetFileName(val) != galleryTitleLabel.Text).ToArray();

                    if (allIndex == 0)
                    {
                        if (count_elements == 1)
                        {
                             
                            emptyGalleryLabel.Visible = true;
                            galleryTitleLabel.Text = "";
                            listBox1.Visible = false;
                            DescriptionsLabel.Visible = false;
                            deleteItem.Visible = false;
                            galleryPictureBox.Visible = false;
                            galleryAddDescToItem.Visible = false;
                            galleryNextBtn.Visible = false;
                            galleryPreviousBtn.Visible = false;
                            //galleryTitleLabel.Text = "NO PHOTOS FOUND!";
                        }
                        else
                        {
                            allIndex -= 1;
                            galleryNextBtn.PerformClick();
                        }
                    }
                    else if(allIndex == count_elements-1)
                    {   
                        
                        galleryPreviousBtn.PerformClick();
                    }
                    else if(allIndex>0 && allIndex < count_elements-1)
                    {
                        allIndex -= 1;
                        galleryNextBtn.PerformClick();
                    }
                    
                   
                }
                else if(videosFlag == true)
                {
                    int count_elements = videosGallery.Count(s => s != null);
                    videosGallery = videosGallery.Where(val => System.IO.Path.GetFileName(val) != galleryTitleLabel.Text).ToArray();

                    if (indexVideosGallery == 0)
                    {
                        if (count_elements == 1)
                        {
                            emptyGalleryLabel.Visible = true;
                            //emptyGalleryLabel.Text = "NO VIDEOS FOUND!";
                            listBox1.Visible = false;
                            DescriptionsLabel.Visible = false;
                            deleteItem.Visible = false;
                            galleryVideoBox.Visible = false;
                            galleryTitleLabel.Text = "";
                            galleryNextBtn.Visible = false;
                            galleryPreviousBtn.Visible = false;
                            galleryAddDescToItem.Visible = false;
                        }
                        else
                        {
                            indexVideosGallery -= 1;
                            galleryNextBtn.PerformClick();
                        }
                    }
                    else if (indexVideosGallery == count_elements - 1)
                    {

                        galleryPreviousBtn.PerformClick();
                    }
                    else if (indexVideosGallery > 0 && allIndex < count_elements - 1)
                    {
                        indexVideosGallery -= 1;
                        galleryNextBtn.PerformClick();
                    }

                }
            }
            
        }



        //Function that opens the send email form when email button is clicked
        private void sendEmail_Click(object sender, EventArgs e)
        {
            MailForm mailForm = new MailForm(selected_items);
            mailForm.Show();
        }
        

        //Function that select the current media object displayed into search section gallery
        private void selectBtn_Click(object sender, EventArgs e)
        {
            if (selected_items.Contains(searched_results[search_index]) == false && searched_results[search_index]!=null)
            {
                selected_items[selected_index] = searched_results[search_index];
                
                selected_index += 1;
                selectCountLbl.Text = selected_index.ToString();


                selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selectedTrue, new Size(55, 33)));
               // selected = true;
            }
            else if (selected_items.Contains(searched_results[search_index]) == true && searched_results[search_index] != null)
            {
                selected_items = selected_items.Where(val => val != searched_results[search_index]).ToArray();
                selected_index -= 1;
                selectCountLbl.Text = selected_index.ToString();
                selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selected, new Size(55, 33)));
               // selected = false;
            }
        }



        //Function that saves selected media objects externally
        private void saveBtn_Click(object sender, EventArgs e)
        {
            
 
                var saveFileDialog = new SaveFileDialog();
                FolderBrowserDialog folder = new FolderBrowserDialog();
                if (folder.ShowDialog() == DialogResult.OK)
                {
                    //MessageBox.Show(folder.SelectedPath.ToString());
                    var sourceFile = folder.SelectedPath.ToString();
                    //saveFileDialog.FileName = "db.png";
                    //System.IO.File.Copy(sourceFile + ".jpg", saveFileDialog.FileName);
                    // System.IO.File.Create(sourceFile + "\\"+"pnm.png");


                    foreach(string path in selected_items)
                    {
                        if (path != null && System.IO.File.Exists(path))
                        {
                            string FileName = System.IO.Path.GetFileName(path);
                            string FileExtension = System.IO.Path.GetExtension(path);
                            if (CheckIfPhoto(path) == true)
                            {
                               
                                ImageFormat format = ImageFormat.Png;
                                switch (FileExtension)
                                {
                                    case ".jpg": format = ImageFormat.Jpeg; break;
                                    case ".jpeg": format = ImageFormat.Jpeg; break;
                                    case ".png": format = ImageFormat.Png; break;
                                }

                                Bitmap MyImage = new Bitmap(path);
                                PictureBox frame = new PictureBox();
                                // pictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
                                // pictureBox1.ClientSize = new Size(249, 199);
                                frame.Image = (Image)MyImage;
                                frame.Image.Save(sourceFile + "\\" + FileName + FileExtension, format);
                            }
                            else
                            {
                                try {
                                    System.IO.File.Copy(path, sourceFile + "\\" + FileName + FileExtension); 
                                }
                                catch
                                {

                                }

                            }
                        }
                    }    

                   // searchPictureBox.Image.Save(sourceFile+"\\pnm.png", System.Drawing.Imaging.ImageFormat.Png);

                }
        }



        //Function that select/unselect all media objects from search gallery section
        private void button1_Click(object sender, EventArgs e)
        {
            if (selectAllPressed == false)
            {
                Array.Clear(selected_items, 0, selected_items.Length);
                selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selectedTrue, new Size(55, 33)));
                searched_results.CopyTo(selected_items, 0);
                selected_index = selected_items.Count(val => val != null);
                selectCountLbl.Text = selected_index.ToString();
                selectAllPressed = true;
            }
            else
            {
                Array.Clear(selected_items, 0, selected_items.Length);
                selected_index = 0;
                selectCountLbl.Text = selected_index.ToString();
                selectBtn.Image = (Image)(new Bitmap(GUI_form.Properties.Resources.selected, new Size(55, 33)));
                selectAllPressed = false;
            }
        }

        private int sel = 0;


       //Function that prints selected media object from search gallery section
        private void printDocument1_PrintPage_1(object sender, System.Drawing.Printing.PrintPageEventArgs e)
        {
            if (sel < selected_items.Count(val => val != null)) e.HasMorePages = true;
            else e.HasMorePages = false;
          
            string path = selected_items[sel];
            this.sel += 1;
              
                if (path != null && System.IO.File.Exists(path) && CheckIfPhoto(path))
                {
                    e.Graphics.DrawString(System.IO.Path.GetFileName(path), this.Font, Brushes.Black, 0, 0);
                    System.Drawing.Image img = System.Drawing.Image.FromFile(path);   
                    Point loc = new Point(0,40);
                    e.Graphics.DrawImage(img, loc);
                }
        }



        //Function that prints all selected items from search gallery section
        private void printBtn_Click(object sender, EventArgs e)
        {
           
            PrintPreviewDialog dlg = new PrintPreviewDialog();
            dlg.Document = printDocument1 ;
            dlg.ShowDialog();

          

            PrintDialog dlgg = new PrintDialog();
            dlgg.Document = printDocument1;
            dlgg.ShowDialog();

            // If the result is OK then print the document.
            if (dlg.DialogResult == DialogResult.OK)
            {
                printDocument1.Print();
            }

        }



        //Function that opens warning form to show the warnings when media items path was changed 
        private void warningBtn_Click(object sender, EventArgs e)
        {
            WarningsForm warningForm = new WarningsForm(warnings);
            warningForm.ShowDialog();
            if (warningForm.DialogResult == DialogResult.OK)
            {
                int warnCount = 0;
                foreach(string path in warnings)
                {
                    if (path != null)
                    {
                        string name = System.IO.Path.GetFileName(path);
                        api.DeleteItem(name);
                        warnCount += 1;
                    }
                }
                warningBtn.Visible = false;
                MessageBox.Show(warnCount.ToString() + " warnings removed!");
            }
        }
    }
   
}
