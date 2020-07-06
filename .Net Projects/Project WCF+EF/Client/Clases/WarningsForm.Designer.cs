namespace GUI_form
{
    partial class WarningsForm
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
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.namesBox = new System.Windows.Forms.ListBox();
            this.pathBox = new System.Windows.Forms.ListBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.removeBtn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.label1.Location = new System.Drawing.Point(145, 39);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(298, 17);
            this.label1.TabIndex = 0;
            this.label1.Text = "Some photos was moved from the initial place!";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12.25F);
            this.label2.ForeColor = System.Drawing.Color.Yellow;
            this.label2.Location = new System.Drawing.Point(233, 9);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(89, 20);
            this.label2.TabIndex = 1;
            this.label2.Text = "WARNING";
            // 
            // namesBox
            // 
            this.namesBox.FormattingEnabled = true;
            this.namesBox.Location = new System.Drawing.Point(39, 96);
            this.namesBox.Name = "namesBox";
            this.namesBox.ScrollAlwaysVisible = true;
            this.namesBox.Size = new System.Drawing.Size(200, 290);
            this.namesBox.TabIndex = 2;
            // 
            // pathBox
            // 
            this.pathBox.FormattingEnabled = true;
            this.pathBox.HorizontalExtent = 100;
            this.pathBox.HorizontalScrollbar = true;
            this.pathBox.Location = new System.Drawing.Point(237, 96);
            this.pathBox.Name = "pathBox";
            this.pathBox.ScrollAlwaysVisible = true;
            this.pathBox.Size = new System.Drawing.Size(300, 290);
            this.pathBox.TabIndex = 3;
            // 
            // label3
            // 
            this.label3.BackColor = System.Drawing.SystemColors.ButtonShadow;
            this.label3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.label3.Location = new System.Drawing.Point(39, 80);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(200, 18);
            this.label3.TabIndex = 4;
            this.label3.Text = "NAME";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label4
            // 
            this.label4.BackColor = System.Drawing.SystemColors.ButtonShadow;
            this.label4.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.label4.Location = new System.Drawing.Point(237, 80);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(300, 18);
            this.label4.TabIndex = 5;
            this.label4.Text = "PATH";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // removeBtn
            // 
            this.removeBtn.BackColor = System.Drawing.Color.Olive;
            this.removeBtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.removeBtn.Location = new System.Drawing.Point(222, 398);
            this.removeBtn.Name = "removeBtn";
            this.removeBtn.Size = new System.Drawing.Size(100, 40);
            this.removeBtn.TabIndex = 6;
            this.removeBtn.Text = "Remove Warnings";
            this.removeBtn.UseVisualStyleBackColor = false;
            this.removeBtn.Click += new System.EventHandler(this.removeBtn_Click);
            // 
            // WarningsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(584, 450);
            this.Controls.Add(this.removeBtn);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.pathBox);
            this.Controls.Add(this.namesBox);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "WarningsForm";
            this.Text = "Warnings";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ListBox namesBox;
        private System.Windows.Forms.ListBox pathBox;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button removeBtn;
    }
}