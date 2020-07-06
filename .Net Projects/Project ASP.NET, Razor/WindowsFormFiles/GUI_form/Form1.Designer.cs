using System.Drawing;
using System.Drawing.Printing;
namespace GUI_form
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.ImportImageBtn = new System.Windows.Forms.Button();
            this.ImageTitle = new System.Windows.Forms.Label();
            this.TitleLabel = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.EnterPropertyText = new System.Windows.Forms.TextBox();
            this.AddProperty = new System.Windows.Forms.Button();
            this.newPropertyBtn = new System.Windows.Forms.Button();
            this.NextImage = new System.Windows.Forms.Button();
            this.PreviousImage = new System.Windows.Forms.Button();
            this.importVideoBox = new AxWMPLib.AxWindowsMediaPlayer();
            this.ImportVideo = new System.Windows.Forms.Button();
            this.ImportGroupBox = new System.Windows.Forms.GroupBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.Gallery = new System.Windows.Forms.GroupBox();
            this.warningBtn = new System.Windows.Forms.Button();
            this.DescriptionsLabel = new System.Windows.Forms.Label();
            this.emptyGalleryLabel = new System.Windows.Forms.Label();
            this.deleteItem = new System.Windows.Forms.Button();
            this.galleryVideoBox = new AxWMPLib.AxWindowsMediaPlayer();
            this.galleryAddDescToItem = new System.Windows.Forms.Button();
            this.galleryTitleLabel = new System.Windows.Forms.Label();
            this.videosBtn = new System.Windows.Forms.Button();
            this.allBtn = new System.Windows.Forms.Button();
            this.galleryNextBtn = new System.Windows.Forms.Button();
            this.galleryPreviousBtn = new System.Windows.Forms.Button();
            this.galleryPictureBox = new System.Windows.Forms.PictureBox();
            this.Search = new System.Windows.Forms.GroupBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label3 = new System.Windows.Forms.Label();
            this.selectCountLbl = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.selectBtn = new System.Windows.Forms.Button();
            this.saveBtn = new System.Windows.Forms.Button();
            this.printBtn = new System.Windows.Forms.Button();
            this.sendEmail = new System.Windows.Forms.Button();
            this.searchTitleLabel = new System.Windows.Forms.Label();
            this.resultsCountLabel = new System.Windows.Forms.Label();
            this.prevSearchBtn = new System.Windows.Forms.Button();
            this.nextSearchBtn = new System.Windows.Forms.Button();
            this.searchVideoBox = new AxWMPLib.AxWindowsMediaPlayer();
            this.searchPictureBox = new System.Windows.Forms.PictureBox();
            this.FindBtn = new System.Windows.Forms.Button();
            this.searchBar = new System.Windows.Forms.TextBox();
            this.toolTip1 = new System.Windows.Forms.ToolTip(this.components);
            this.toolTip2 = new System.Windows.Forms.ToolTip(this.components);
            this.toolTip3 = new System.Windows.Forms.ToolTip(this.components);
            this.toolTip4 = new System.Windows.Forms.ToolTip(this.components);
            this.toolTip5 = new System.Windows.Forms.ToolTip(this.components);
            this.toolTip6 = new System.Windows.Forms.ToolTip(this.components);
            this.toolTip7 = new System.Windows.Forms.ToolTip(this.components);
            this.printDocument1 = new System.Drawing.Printing.PrintDocument();
            this.toolTip8 = new System.Windows.Forms.ToolTip(this.components);
            this.importedLabel = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.importVideoBox)).BeginInit();
            this.ImportGroupBox.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.Gallery.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.galleryVideoBox)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.galleryPictureBox)).BeginInit();
            this.Search.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.searchVideoBox)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.searchPictureBox)).BeginInit();
            this.SuspendLayout();
            // 
            // ImportImageBtn
            // 
            this.ImportImageBtn.BackColor = System.Drawing.Color.Coral;
            this.ImportImageBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ImportImageBtn.Location = new System.Drawing.Point(48, 19);
            this.ImportImageBtn.Name = "ImportImageBtn";
            this.ImportImageBtn.Size = new System.Drawing.Size(115, 30);
            this.ImportImageBtn.TabIndex = 2;
            this.ImportImageBtn.Tag = "ImportImage";
            this.ImportImageBtn.Text = "Import Images";
            this.ImportImageBtn.UseVisualStyleBackColor = false;
            this.ImportImageBtn.Click += new System.EventHandler(this.importImage_Click);
            // 
            // ImageTitle
            // 
            this.ImageTitle.AutoSize = true;
            this.ImageTitle.Location = new System.Drawing.Point(45, 98);
            this.ImageTitle.Name = "ImageTitle";
            this.ImageTitle.Size = new System.Drawing.Size(0, 17);
            this.ImageTitle.TabIndex = 4;
            this.ImageTitle.Click += new System.EventHandler(this.label1_Click);
            // 
            // TitleLabel
            // 
            this.TitleLabel.AutoSize = true;
            this.TitleLabel.Location = new System.Drawing.Point(2, 98);
            this.TitleLabel.Name = "TitleLabel";
            this.TitleLabel.Size = new System.Drawing.Size(0, 17);
            this.TitleLabel.TabIndex = 5;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(51, 141);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(143, 17);
            this.label2.TabIndex = 6;
            this.label2.Text = "Enter properties now:";
            // 
            // EnterPropertyText
            // 
            this.EnterPropertyText.Location = new System.Drawing.Point(9, 159);
            this.EnterPropertyText.Name = "EnterPropertyText";
            this.EnterPropertyText.Size = new System.Drawing.Size(209, 23);
            this.EnterPropertyText.TabIndex = 7;
            // 
            // AddProperty
            // 
            this.AddProperty.BackColor = System.Drawing.Color.RosyBrown;
            this.AddProperty.Cursor = System.Windows.Forms.Cursors.Hand;
            this.AddProperty.Location = new System.Drawing.Point(27, 183);
            this.AddProperty.Name = "AddProperty";
            this.AddProperty.Size = new System.Drawing.Size(75, 35);
            this.AddProperty.TabIndex = 8;
            this.AddProperty.Text = "Add";
            this.toolTip6.SetToolTip(this.AddProperty, "Add this description to item");
            this.AddProperty.UseVisualStyleBackColor = false;
            this.AddProperty.Click += new System.EventHandler(this.AddProperty_Click);
            // 
            // newPropertyBtn
            // 
            this.newPropertyBtn.BackColor = System.Drawing.Color.RosyBrown;
            this.newPropertyBtn.Location = new System.Drawing.Point(124, 183);
            this.newPropertyBtn.Name = "newPropertyBtn";
            this.newPropertyBtn.Size = new System.Drawing.Size(75, 35);
            this.newPropertyBtn.TabIndex = 9;
            this.newPropertyBtn.Text = "New";
            this.newPropertyBtn.UseVisualStyleBackColor = false;
            this.newPropertyBtn.Click += new System.EventHandler(this.newPropertyBtn_Click);
            // 
            // NextImage
            // 
            this.NextImage.BackColor = System.Drawing.Color.Sienna;
            this.NextImage.Location = new System.Drawing.Point(477, 103);
            this.NextImage.Name = "NextImage";
            this.NextImage.Size = new System.Drawing.Size(20, 23);
            this.NextImage.TabIndex = 10;
            this.NextImage.Text = "> ";
            this.NextImage.UseVisualStyleBackColor = false;
            this.NextImage.Click += new System.EventHandler(this.NextImage_Click);
            // 
            // PreviousImage
            // 
            this.PreviousImage.BackColor = System.Drawing.Color.Sienna;
            this.PreviousImage.Location = new System.Drawing.Point(200, 98);
            this.PreviousImage.Name = "PreviousImage";
            this.PreviousImage.Size = new System.Drawing.Size(20, 23);
            this.PreviousImage.TabIndex = 11;
            this.PreviousImage.Text = "<< ";
            this.PreviousImage.UseVisualStyleBackColor = false;
            this.PreviousImage.Click += new System.EventHandler(this.PreviousImage_Click);
            // 
            // importVideoBox
            // 
            this.importVideoBox.Enabled = true;
            this.importVideoBox.Location = new System.Drawing.Point(224, 19);
            this.importVideoBox.Name = "importVideoBox";
            this.importVideoBox.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("importVideoBox.OcxState")));
            this.importVideoBox.Size = new System.Drawing.Size(249, 199);
            this.importVideoBox.TabIndex = 12;
            this.importVideoBox.Visible = false;
            // 
            // ImportVideo
            // 
            this.ImportVideo.BackColor = System.Drawing.Color.Coral;
            this.ImportVideo.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ImportVideo.Location = new System.Drawing.Point(48, 49);
            this.ImportVideo.Name = "ImportVideo";
            this.ImportVideo.Size = new System.Drawing.Size(115, 29);
            this.ImportVideo.TabIndex = 13;
            this.ImportVideo.Text = "Import Videos";
            this.ImportVideo.UseVisualStyleBackColor = false;
            this.ImportVideo.Click += new System.EventHandler(this.ImportVideo_Click);
            // 
            // ImportGroupBox
            // 
            this.ImportGroupBox.BackColor = System.Drawing.Color.DarkSeaGreen;
            this.ImportGroupBox.Controls.Add(this.importedLabel);
            this.ImportGroupBox.Controls.Add(this.ImportImageBtn);
            this.ImportGroupBox.Controls.Add(this.ImportVideo);
            this.ImportGroupBox.Controls.Add(this.ImageTitle);
            this.ImportGroupBox.Controls.Add(this.label2);
            this.ImportGroupBox.Controls.Add(this.pictureBox1);
            this.ImportGroupBox.Controls.Add(this.newPropertyBtn);
            this.ImportGroupBox.Controls.Add(this.NextImage);
            this.ImportGroupBox.Controls.Add(this.AddProperty);
            this.ImportGroupBox.Controls.Add(this.PreviousImage);
            this.ImportGroupBox.Controls.Add(this.EnterPropertyText);
            this.ImportGroupBox.Controls.Add(this.importVideoBox);
            this.ImportGroupBox.Controls.Add(this.TitleLabel);
            this.ImportGroupBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.ImportGroupBox.Location = new System.Drawing.Point(12, 12);
            this.ImportGroupBox.Name = "ImportGroupBox";
            this.ImportGroupBox.Size = new System.Drawing.Size(500, 227);
            this.ImportGroupBox.TabIndex = 14;
            this.ImportGroupBox.TabStop = false;
            this.ImportGroupBox.Text = "IMPORT";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Location = new System.Drawing.Point(224, 19);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(249, 199);
            this.pictureBox1.TabIndex = 3;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Visible = false;
            // 
            // listBox1
            // 
            this.listBox1.BackColor = System.Drawing.Color.DarkSalmon;
            this.listBox1.Cursor = System.Windows.Forms.Cursors.Hand;
            this.listBox1.FormattingEnabled = true;
            this.listBox1.HorizontalScrollbar = true;
            this.listBox1.ItemHeight = 17;
            this.listBox1.Location = new System.Drawing.Point(87, 402);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(462, 38);
            this.listBox1.TabIndex = 15;
            this.listBox1.Visible = false;
            this.listBox1.SelectedIndexChanged += new System.EventHandler(this.listBox1_SelectedIndexChanged);
            // 
            // Gallery
            // 
            this.Gallery.BackColor = System.Drawing.Color.DarkSalmon;
            this.Gallery.Controls.Add(this.warningBtn);
            this.Gallery.Controls.Add(this.DescriptionsLabel);
            this.Gallery.Controls.Add(this.emptyGalleryLabel);
            this.Gallery.Controls.Add(this.deleteItem);
            this.Gallery.Controls.Add(this.galleryVideoBox);
            this.Gallery.Controls.Add(this.galleryAddDescToItem);
            this.Gallery.Controls.Add(this.galleryTitleLabel);
            this.Gallery.Controls.Add(this.videosBtn);
            this.Gallery.Controls.Add(this.allBtn);
            this.Gallery.Controls.Add(this.galleryNextBtn);
            this.Gallery.Controls.Add(this.galleryPreviousBtn);
            this.Gallery.Controls.Add(this.galleryPictureBox);
            this.Gallery.Controls.Add(this.listBox1);
            this.Gallery.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.Gallery.Location = new System.Drawing.Point(518, 12);
            this.Gallery.Name = "Gallery";
            this.Gallery.Size = new System.Drawing.Size(616, 486);
            this.Gallery.TabIndex = 17;
            this.Gallery.TabStop = false;
            this.Gallery.Text = "GALLERY";
            // 
            // warningBtn
            // 
            this.warningBtn.BackgroundImage = global::GUI_form.Properties.Resources.warningicon;
            this.warningBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.warningBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.warningBtn.Location = new System.Drawing.Point(574, 402);
            this.warningBtn.Name = "warningBtn";
            this.warningBtn.Size = new System.Drawing.Size(33, 33);
            this.warningBtn.TabIndex = 31;
            this.toolTip8.SetToolTip(this.warningBtn, "WARNING!");
            this.warningBtn.UseVisualStyleBackColor = true;
            this.warningBtn.Click += new System.EventHandler(this.warningBtn_Click);
            // 
            // DescriptionsLabel
            // 
            this.DescriptionsLabel.AutoSize = true;
            this.DescriptionsLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F);
            this.DescriptionsLabel.Location = new System.Drawing.Point(255, 390);
            this.DescriptionsLabel.Name = "DescriptionsLabel";
            this.DescriptionsLabel.Size = new System.Drawing.Size(68, 13);
            this.DescriptionsLabel.TabIndex = 27;
            this.DescriptionsLabel.Text = "Descriptions:";
            this.DescriptionsLabel.Visible = false;
            // 
            // emptyGalleryLabel
            // 
            this.emptyGalleryLabel.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.emptyGalleryLabel.AutoSize = true;
            this.emptyGalleryLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.emptyGalleryLabel.ForeColor = System.Drawing.SystemColors.ButtonShadow;
            this.emptyGalleryLabel.Location = new System.Drawing.Point(145, 209);
            this.emptyGalleryLabel.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.emptyGalleryLabel.Name = "emptyGalleryLabel";
            this.emptyGalleryLabel.Padding = new System.Windows.Forms.Padding(50, 0, 50, 0);
            this.emptyGalleryLabel.Size = new System.Drawing.Size(331, 25);
            this.emptyGalleryLabel.TabIndex = 26;
            this.emptyGalleryLabel.Text = "GALLERY IS EMPTY";
            this.emptyGalleryLabel.Visible = false;
            // 
            // deleteItem
            // 
            this.deleteItem.BackColor = System.Drawing.Color.OrangeRed;
            this.deleteItem.Cursor = System.Windows.Forms.Cursors.Hand;
            this.deleteItem.Location = new System.Drawing.Point(540, 447);
            this.deleteItem.Name = "deleteItem";
            this.deleteItem.Size = new System.Drawing.Size(75, 37);
            this.deleteItem.TabIndex = 25;
            this.deleteItem.Text = "Delete";
            this.toolTip4.SetToolTip(this.deleteItem, "DELETE ");
            this.deleteItem.UseVisualStyleBackColor = false;
            this.deleteItem.Visible = false;
            this.deleteItem.Click += new System.EventHandler(this.deleteItem_Click);
            // 
            // galleryVideoBox
            // 
            this.galleryVideoBox.Enabled = true;
            this.galleryVideoBox.Location = new System.Drawing.Point(41, 32);
            this.galleryVideoBox.Name = "galleryVideoBox";
            this.galleryVideoBox.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("galleryVideoBox.OcxState")));
            this.galleryVideoBox.Size = new System.Drawing.Size(538, 356);
            this.galleryVideoBox.TabIndex = 30;
            this.galleryVideoBox.Visible = false;
            // 
            // galleryAddDescToItem
            // 
            this.galleryAddDescToItem.BackColor = System.Drawing.Color.RosyBrown;
            this.galleryAddDescToItem.Cursor = System.Windows.Forms.Cursors.Hand;
            this.galleryAddDescToItem.Location = new System.Drawing.Point(389, 447);
            this.galleryAddDescToItem.Name = "galleryAddDescToItem";
            this.galleryAddDescToItem.Size = new System.Drawing.Size(151, 37);
            this.galleryAddDescToItem.TabIndex = 24;
            this.galleryAddDescToItem.Text = "Add new description";
            this.galleryAddDescToItem.UseVisualStyleBackColor = false;
            this.galleryAddDescToItem.Visible = false;
            this.galleryAddDescToItem.Click += new System.EventHandler(this.galleryAddDescToItem_Click);
            // 
            // galleryTitleLabel
            // 
            this.galleryTitleLabel.AutoSize = true;
            this.galleryTitleLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12.25F);
            this.galleryTitleLabel.Location = new System.Drawing.Point(268, 13);
            this.galleryTitleLabel.Name = "galleryTitleLabel";
            this.galleryTitleLabel.Size = new System.Drawing.Size(0, 20);
            this.galleryTitleLabel.TabIndex = 23;
            // 
            // videosBtn
            // 
            this.videosBtn.BackColor = System.Drawing.Color.RosyBrown;
            this.videosBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.videosBtn.Location = new System.Drawing.Point(76, 446);
            this.videosBtn.Name = "videosBtn";
            this.videosBtn.Size = new System.Drawing.Size(75, 38);
            this.videosBtn.TabIndex = 22;
            this.videosBtn.Text = "Videos";
            this.toolTip4.SetToolTip(this.videosBtn, "OPEN VIDEO GALLERY");
            this.videosBtn.UseVisualStyleBackColor = false;
            this.videosBtn.Click += new System.EventHandler(this.videosBtn_Click);
            // 
            // allBtn
            // 
            this.allBtn.BackColor = System.Drawing.Color.RosyBrown;
            this.allBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.allBtn.Location = new System.Drawing.Point(1, 446);
            this.allBtn.Name = "allBtn";
            this.allBtn.Size = new System.Drawing.Size(75, 38);
            this.allBtn.TabIndex = 20;
            this.allBtn.Text = "Photos";
            this.toolTip4.SetToolTip(this.allBtn, "OPEN PHOTO GALLERY");
            this.allBtn.UseVisualStyleBackColor = false;
            this.allBtn.Click += new System.EventHandler(this.allBtn_Click);
            // 
            // galleryNextBtn
            // 
            this.galleryNextBtn.BackColor = System.Drawing.Color.Sienna;
            this.galleryNextBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.galleryNextBtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 20.25F);
            this.galleryNextBtn.Location = new System.Drawing.Point(574, 194);
            this.galleryNextBtn.Name = "galleryNextBtn";
            this.galleryNextBtn.Size = new System.Drawing.Size(42, 49);
            this.galleryNextBtn.TabIndex = 19;
            this.galleryNextBtn.Text = ">";
            this.galleryNextBtn.UseVisualStyleBackColor = false;
            this.galleryNextBtn.Visible = false;
            this.galleryNextBtn.Click += new System.EventHandler(this.galleryNextBtn_Click);
            // 
            // galleryPreviousBtn
            // 
            this.galleryPreviousBtn.BackColor = System.Drawing.Color.Sienna;
            this.galleryPreviousBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.galleryPreviousBtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 20.25F);
            this.galleryPreviousBtn.Location = new System.Drawing.Point(0, 194);
            this.galleryPreviousBtn.Name = "galleryPreviousBtn";
            this.galleryPreviousBtn.Size = new System.Drawing.Size(42, 49);
            this.galleryPreviousBtn.TabIndex = 18;
            this.galleryPreviousBtn.Text = "<";
            this.galleryPreviousBtn.UseVisualStyleBackColor = false;
            this.galleryPreviousBtn.Visible = false;
            this.galleryPreviousBtn.Click += new System.EventHandler(this.galleryPreviousBtn_Click);
            // 
            // galleryPictureBox
            // 
            this.galleryPictureBox.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.galleryPictureBox.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.galleryPictureBox.Location = new System.Drawing.Point(40, 32);
            this.galleryPictureBox.Name = "galleryPictureBox";
            this.galleryPictureBox.Size = new System.Drawing.Size(538, 353);
            this.galleryPictureBox.TabIndex = 16;
            this.galleryPictureBox.TabStop = false;
            this.galleryPictureBox.Visible = false;
            // 
            // Search
            // 
            this.Search.BackColor = System.Drawing.Color.DarkOliveGreen;
            this.Search.Controls.Add(this.groupBox1);
            this.Search.Controls.Add(this.button1);
            this.Search.Controls.Add(this.selectBtn);
            this.Search.Controls.Add(this.saveBtn);
            this.Search.Controls.Add(this.printBtn);
            this.Search.Controls.Add(this.sendEmail);
            this.Search.Controls.Add(this.searchTitleLabel);
            this.Search.Controls.Add(this.resultsCountLabel);
            this.Search.Controls.Add(this.prevSearchBtn);
            this.Search.Controls.Add(this.nextSearchBtn);
            this.Search.Controls.Add(this.searchVideoBox);
            this.Search.Controls.Add(this.searchPictureBox);
            this.Search.Controls.Add(this.FindBtn);
            this.Search.Controls.Add(this.searchBar);
            this.Search.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.Search.Location = new System.Drawing.Point(12, 245);
            this.Search.Name = "Search";
            this.Search.Size = new System.Drawing.Size(500, 253);
            this.Search.TabIndex = 18;
            this.Search.TabStop = false;
            this.Search.Text = "SEARCH";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.selectCountLbl);
            this.groupBox1.Location = new System.Drawing.Point(428, 17);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(55, 48);
            this.groupBox1.TabIndex = 15;
            this.groupBox1.TabStop = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 6.25F);
            this.label3.Location = new System.Drawing.Point(1, 10);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(53, 12);
            this.label3.TabIndex = 14;
            this.label3.Text = "SELECTED";
            // 
            // selectCountLbl
            // 
            this.selectCountLbl.Dock = System.Windows.Forms.DockStyle.Fill;
            this.selectCountLbl.Font = new System.Drawing.Font("Microsoft Sans Serif", 12.25F);
            this.selectCountLbl.Location = new System.Drawing.Point(3, 19);
            this.selectCountLbl.Name = "selectCountLbl";
            this.selectCountLbl.Size = new System.Drawing.Size(49, 26);
            this.selectCountLbl.TabIndex = 13;
            this.selectCountLbl.Text = "0";
            this.selectCountLbl.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.Honeydew;
            this.button1.BackgroundImage = global::GUI_form.Properties.Resources.selectALL;
            this.button1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.button1.Cursor = System.Windows.Forms.Cursors.Hand;
            this.button1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.Location = new System.Drawing.Point(6, 135);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(52, 49);
            this.button1.TabIndex = 12;
            this.toolTip1.SetToolTip(this.button1, "(UN) SELECT ALL");
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // selectBtn
            // 
            this.selectBtn.BackColor = System.Drawing.Color.Yellow;
            this.selectBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.selectBtn.Image = ((System.Drawing.Image)(resources.GetObject("selectBtn.Image")));
            this.selectBtn.Location = new System.Drawing.Point(428, 71);
            this.selectBtn.Name = "selectBtn";
            this.selectBtn.Size = new System.Drawing.Size(55, 36);
            this.selectBtn.TabIndex = 11;
            this.toolTip2.SetToolTip(this.selectBtn, "(UN) SELECT THIS");
            this.selectBtn.UseVisualStyleBackColor = false;
            this.selectBtn.Click += new System.EventHandler(this.selectBtn_Click);
            // 
            // saveBtn
            // 
            this.saveBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.saveBtn.Image = ((System.Drawing.Image)(resources.GetObject("saveBtn.Image")));
            this.saveBtn.Location = new System.Drawing.Point(428, 121);
            this.saveBtn.Name = "saveBtn";
            this.saveBtn.Size = new System.Drawing.Size(55, 33);
            this.saveBtn.TabIndex = 10;
            this.toolTip3.SetToolTip(this.saveBtn, "SAVE SELECTED TO");
            this.saveBtn.UseVisualStyleBackColor = true;
            this.saveBtn.Click += new System.EventHandler(this.saveBtn_Click);
            // 
            // printBtn
            // 
            this.printBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.printBtn.Image = ((System.Drawing.Image)(resources.GetObject("printBtn.Image")));
            this.printBtn.Location = new System.Drawing.Point(428, 169);
            this.printBtn.Name = "printBtn";
            this.printBtn.Size = new System.Drawing.Size(55, 33);
            this.printBtn.TabIndex = 9;
            this.toolTip4.SetToolTip(this.printBtn, "PRINT SELECTED");
            this.printBtn.UseVisualStyleBackColor = true;
            this.printBtn.Click += new System.EventHandler(this.printBtn_Click);
            // 
            // sendEmail
            // 
            this.sendEmail.Cursor = System.Windows.Forms.Cursors.Hand;
            this.sendEmail.Image = ((System.Drawing.Image)(resources.GetObject("sendEmail.Image")));
            this.sendEmail.Location = new System.Drawing.Point(428, 214);
            this.sendEmail.Name = "sendEmail";
            this.sendEmail.Size = new System.Drawing.Size(55, 33);
            this.sendEmail.TabIndex = 8;
            this.toolTip5.SetToolTip(this.sendEmail, "SEND SELECTED ON EMAIL");
            this.sendEmail.UseVisualStyleBackColor = true;
            this.sendEmail.Click += new System.EventHandler(this.sendEmail_Click);
            // 
            // searchTitleLabel
            // 
            this.searchTitleLabel.AutoSize = true;
            this.searchTitleLabel.Cursor = System.Windows.Forms.Cursors.Default;
            this.searchTitleLabel.Location = new System.Drawing.Point(194, 54);
            this.searchTitleLabel.Name = "searchTitleLabel";
            this.searchTitleLabel.Size = new System.Drawing.Size(0, 17);
            this.searchTitleLabel.TabIndex = 7;
            // 
            // resultsCountLabel
            // 
            this.resultsCountLabel.AutoSize = true;
            this.resultsCountLabel.Location = new System.Drawing.Point(188, 38);
            this.resultsCountLabel.Name = "resultsCountLabel";
            this.resultsCountLabel.Size = new System.Drawing.Size(0, 17);
            this.resultsCountLabel.TabIndex = 6;
            // 
            // prevSearchBtn
            // 
            this.prevSearchBtn.BackColor = System.Drawing.Color.Sienna;
            this.prevSearchBtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.prevSearchBtn.Location = new System.Drawing.Point(64, 71);
            this.prevSearchBtn.Name = "prevSearchBtn";
            this.prevSearchBtn.Size = new System.Drawing.Size(22, 176);
            this.prevSearchBtn.TabIndex = 5;
            this.prevSearchBtn.Text = "<";
            this.prevSearchBtn.UseVisualStyleBackColor = false;
            this.prevSearchBtn.Visible = false;
            this.prevSearchBtn.Click += new System.EventHandler(this.prevSearchBtn_Click);
            // 
            // nextSearchBtn
            // 
            this.nextSearchBtn.BackColor = System.Drawing.Color.Sienna;
            this.nextSearchBtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.nextSearchBtn.Location = new System.Drawing.Point(380, 71);
            this.nextSearchBtn.Name = "nextSearchBtn";
            this.nextSearchBtn.Size = new System.Drawing.Size(22, 176);
            this.nextSearchBtn.TabIndex = 4;
            this.nextSearchBtn.Text = ">";
            this.nextSearchBtn.UseVisualStyleBackColor = false;
            this.nextSearchBtn.Visible = false;
            this.nextSearchBtn.Click += new System.EventHandler(this.nextSearchBtn_Click);
            // 
            // searchVideoBox
            // 
            this.searchVideoBox.Enabled = true;
            this.searchVideoBox.Location = new System.Drawing.Point(83, 71);
            this.searchVideoBox.Name = "searchVideoBox";
            this.searchVideoBox.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("searchVideoBox.OcxState")));
            this.searchVideoBox.Size = new System.Drawing.Size(300, 176);
            this.searchVideoBox.TabIndex = 3;
            this.searchVideoBox.Visible = false;
            // 
            // searchPictureBox
            // 
            this.searchPictureBox.Location = new System.Drawing.Point(83, 71);
            this.searchPictureBox.Name = "searchPictureBox";
            this.searchPictureBox.Size = new System.Drawing.Size(300, 176);
            this.searchPictureBox.TabIndex = 2;
            this.searchPictureBox.TabStop = false;
            this.searchPictureBox.Visible = false;
            // 
            // FindBtn
            // 
            this.FindBtn.Cursor = System.Windows.Forms.Cursors.Hand;
            this.FindBtn.Image = ((System.Drawing.Image)(resources.GetObject("FindBtn.Image")));
            this.FindBtn.Location = new System.Drawing.Point(341, 12);
            this.FindBtn.Name = "FindBtn";
            this.FindBtn.Size = new System.Drawing.Size(36, 28);
            this.FindBtn.TabIndex = 1;
            this.FindBtn.UseVisualStyleBackColor = true;
            this.FindBtn.Click += new System.EventHandler(this.FindBtn_Click);
            // 
            // searchBar
            // 
            this.searchBar.Location = new System.Drawing.Point(104, 15);
            this.searchBar.Margin = new System.Windows.Forms.Padding(3, 3, 3, 30);
            this.searchBar.Name = "searchBar";
            this.searchBar.Size = new System.Drawing.Size(237, 23);
            this.searchBar.TabIndex = 0;
            this.searchBar.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.searchBar.TextChanged += new System.EventHandler(this.searchBar_TextChanged);
            // 
            // printDocument1
            // 
            this.printDocument1.PrintPage += new System.Drawing.Printing.PrintPageEventHandler(this.printDocument1_PrintPage_1);
            // 
            // importedLabel
            // 
            this.importedLabel.AutoSize = true;
            this.importedLabel.Location = new System.Drawing.Point(163, 0);
            this.importedLabel.Name = "importedLabel";
            this.importedLabel.Size = new System.Drawing.Size(0, 17);
            this.importedLabel.TabIndex = 14;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(1142, 510);
            this.Controls.Add(this.Search);
            this.Controls.Add(this.Gallery);
            this.Controls.Add(this.ImportGroupBox);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MinimumSize = new System.Drawing.Size(1158, 549);
            this.Name = "Form1";
            this.Text = "MyPhotos";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.importVideoBox)).EndInit();
            this.ImportGroupBox.ResumeLayout(false);
            this.ImportGroupBox.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.Gallery.ResumeLayout(false);
            this.Gallery.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.galleryVideoBox)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.galleryPictureBox)).EndInit();
            this.Search.ResumeLayout(false);
            this.Search.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.searchVideoBox)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.searchPictureBox)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
       // private PrintDocument printDocument1 = new PrintDocument();
      
        private System.Windows.Forms.Button ImportImageBtn;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label ImageTitle;
        private System.Windows.Forms.Label TitleLabel;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox EnterPropertyText;
        private System.Windows.Forms.Button AddProperty;
        private System.Windows.Forms.Button newPropertyBtn;
        private System.Windows.Forms.Button NextImage;
        private System.Windows.Forms.Button PreviousImage;
        private AxWMPLib.AxWindowsMediaPlayer importVideoBox;
        private System.Windows.Forms.Button ImportVideo;
        private System.Windows.Forms.GroupBox ImportGroupBox;
        private System.Windows.Forms.ListBox listBox1;
        private System.Windows.Forms.GroupBox Gallery;
        private System.Windows.Forms.Button galleryNextBtn;
        private System.Windows.Forms.Button galleryPreviousBtn;
        private AxWMPLib.AxWindowsMediaPlayer galleryVideoBox;
        private System.Windows.Forms.PictureBox galleryPictureBox;
        private System.Windows.Forms.Button videosBtn;
        private System.Windows.Forms.Button allBtn;
        private System.Windows.Forms.Label galleryTitleLabel;
        private System.Windows.Forms.Button galleryAddDescToItem;
        private System.Windows.Forms.GroupBox Search;
        private System.Windows.Forms.PictureBox searchPictureBox;
        private System.Windows.Forms.Button FindBtn;
        private System.Windows.Forms.TextBox searchBar;
        private AxWMPLib.AxWindowsMediaPlayer searchVideoBox;
        private System.Windows.Forms.Button prevSearchBtn;
        private System.Windows.Forms.Button nextSearchBtn;
        private System.Windows.Forms.Label resultsCountLabel;
        private System.Windows.Forms.Label searchTitleLabel;
        private System.Windows.Forms.Button deleteItem;
        private System.Windows.Forms.Label emptyGalleryLabel;
        private System.Windows.Forms.Label DescriptionsLabel;
        private System.Windows.Forms.Button sendEmail;
        private System.Windows.Forms.Button printBtn;
        private System.Windows.Forms.Button saveBtn;
        private System.Windows.Forms.Button selectBtn;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.ToolTip toolTip1;
        private System.Windows.Forms.ToolTip toolTip2;
        private System.Windows.Forms.ToolTip toolTip6;
        private System.Windows.Forms.ToolTip toolTip3;
        private System.Windows.Forms.ToolTip toolTip4;
        private System.Windows.Forms.ToolTip toolTip5;
        private System.Windows.Forms.ToolTip toolTip7;
        private PrintDocument printDocument1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label selectCountLbl;
        private System.Windows.Forms.Button warningBtn;
        private System.Windows.Forms.ToolTip toolTip8;
        private System.Windows.Forms.Label importedLabel;
    }
}

