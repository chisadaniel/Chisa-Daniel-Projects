namespace GUI_form
{
    partial class MailForm
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
            this.fromemailBox = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.textBox = new System.Windows.Forms.RichTextBox();
            this.passBox = new System.Windows.Forms.TextBox();
            this.toemailBox = new System.Windows.Forms.TextBox();
            this.ccBox = new System.Windows.Forms.TextBox();
            this.sendBtn = new System.Windows.Forms.Button();
            this.warning = new System.Windows.Forms.Label();
            this.seePassBtn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // fromemailBox
            // 
            this.fromemailBox.BackColor = System.Drawing.Color.Pink;
            this.fromemailBox.Location = new System.Drawing.Point(113, 80);
            this.fromemailBox.Name = "fromemailBox";
            this.fromemailBox.Size = new System.Drawing.Size(209, 20);
            this.fromemailBox.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12.25F);
            this.label1.Location = new System.Drawing.Point(150, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(138, 20);
            this.label1.TabIndex = 1;
            this.label1.Text = "Send Email Form";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(48, 83);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(63, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "Your email*:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(27, 124);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(84, 13);
            this.label3.TabIndex = 3;
            this.label3.Text = "Your password*:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(84, 176);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(27, 13);
            this.label4.TabIndex = 4;
            this.label4.Text = "To*:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(84, 225);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(23, 13);
            this.label5.TabIndex = 5;
            this.label5.Text = "Cc:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(76, 273);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(31, 13);
            this.label6.TabIndex = 6;
            this.label6.Text = "Text:";
            // 
            // textBox
            // 
            this.textBox.BackColor = System.Drawing.Color.Pink;
            this.textBox.Location = new System.Drawing.Point(113, 273);
            this.textBox.Name = "textBox";
            this.textBox.Size = new System.Drawing.Size(209, 136);
            this.textBox.TabIndex = 4;
            this.textBox.Text = "";
            // 
            // passBox
            // 
            this.passBox.BackColor = System.Drawing.Color.Pink;
            this.passBox.Location = new System.Drawing.Point(113, 121);
            this.passBox.Name = "passBox";
            this.passBox.Size = new System.Drawing.Size(209, 20);
            this.passBox.TabIndex = 1;
            this.passBox.UseSystemPasswordChar = true;
            // 
            // toemailBox
            // 
            this.toemailBox.BackColor = System.Drawing.Color.Pink;
            this.toemailBox.Location = new System.Drawing.Point(113, 173);
            this.toemailBox.Name = "toemailBox";
            this.toemailBox.Size = new System.Drawing.Size(209, 20);
            this.toemailBox.TabIndex = 2;
            // 
            // ccBox
            // 
            this.ccBox.BackColor = System.Drawing.Color.Pink;
            this.ccBox.Location = new System.Drawing.Point(113, 222);
            this.ccBox.Name = "ccBox";
            this.ccBox.Size = new System.Drawing.Size(209, 20);
            this.ccBox.TabIndex = 3;
            // 
            // sendBtn
            // 
            this.sendBtn.BackColor = System.Drawing.Color.Chocolate;
            this.sendBtn.Font = new System.Drawing.Font("Wide Latin", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.sendBtn.Location = new System.Drawing.Point(169, 430);
            this.sendBtn.Name = "sendBtn";
            this.sendBtn.Size = new System.Drawing.Size(119, 46);
            this.sendBtn.TabIndex = 5;
            this.sendBtn.Text = "Send";
            this.sendBtn.UseVisualStyleBackColor = false;
            this.sendBtn.Click += new System.EventHandler(this.sendBtn_Click);
            // 
            // warning
            // 
            this.warning.AutoSize = true;
            this.warning.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.warning.ForeColor = System.Drawing.Color.Red;
            this.warning.Location = new System.Drawing.Point(110, 46);
            this.warning.Name = "warning";
            this.warning.Size = new System.Drawing.Size(0, 16);
            this.warning.TabIndex = 12;
            // 
            // seePassBtn
            // 
            this.seePassBtn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(192)))));
            this.seePassBtn.Location = new System.Drawing.Point(322, 120);
            this.seePassBtn.Name = "seePassBtn";
            this.seePassBtn.Size = new System.Drawing.Size(37, 23);
            this.seePassBtn.TabIndex = 13;
            this.seePassBtn.Text = "see";
            this.seePassBtn.UseVisualStyleBackColor = false;
            this.seePassBtn.Click += new System.EventHandler(this.seePassBtn_Click);
            // 
            // MailForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.DarkSalmon;
            this.ClientSize = new System.Drawing.Size(451, 488);
            this.Controls.Add(this.seePassBtn);
            this.Controls.Add(this.warning);
            this.Controls.Add(this.sendBtn);
            this.Controls.Add(this.ccBox);
            this.Controls.Add(this.toemailBox);
            this.Controls.Add(this.passBox);
            this.Controls.Add(this.textBox);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.fromemailBox);
            this.Name = "MailForm";
            this.Text = "Send email";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox fromemailBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.RichTextBox textBox;
        private System.Windows.Forms.TextBox passBox;
        private System.Windows.Forms.TextBox toemailBox;
        private System.Windows.Forms.TextBox ccBox;
        private System.Windows.Forms.Button sendBtn;
        private System.Windows.Forms.Label warning;
        private System.Windows.Forms.Button seePassBtn;
    }
}