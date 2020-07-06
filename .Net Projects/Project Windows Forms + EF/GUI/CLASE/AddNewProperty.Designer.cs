namespace GUI_form
{
    partial class AddNewProperty
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
            this.inputNewProperty = new System.Windows.Forms.TextBox();
            this.addNewPropertyBtn = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // inputNewProperty
            // 
            this.inputNewProperty.Location = new System.Drawing.Point(80, 100);
            this.inputNewProperty.Name = "inputNewProperty";
            this.inputNewProperty.Size = new System.Drawing.Size(161, 20);
            this.inputNewProperty.TabIndex = 0;
            // 
            // addNewPropertyBtn
            // 
            this.addNewPropertyBtn.Location = new System.Drawing.Point(123, 153);
            this.addNewPropertyBtn.Name = "addNewPropertyBtn";
            this.addNewPropertyBtn.Size = new System.Drawing.Size(75, 23);
            this.addNewPropertyBtn.TabIndex = 1;
            this.addNewPropertyBtn.Text = "Add";
            this.addNewPropertyBtn.UseVisualStyleBackColor = true;
            this.addNewPropertyBtn.Click += new System.EventHandler(this.addNewPropertyBtn_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12.25F);
            this.label1.Location = new System.Drawing.Point(49, 56);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(239, 20);
            this.label1.TabIndex = 2;
            this.label1.Text = "Please enter a new description";
            // 
            // AddNewProperty
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(333, 253);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.addNewPropertyBtn);
            this.Controls.Add(this.inputNewProperty);
            this.Name = "AddNewProperty";
            this.Text = "New description";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox inputNewProperty;
        public System.Windows.Forms.Button addNewPropertyBtn;
        
        private System.Windows.Forms.Label label1;
    }
}