using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
 
using EASendMail;

namespace GUI_form
{
    public partial class MailForm : Form
    {
        private string[] mediaPaths = new string[500];
        public MailForm(string[] paths)
        {
            paths.CopyTo(this.mediaPaths, 0); 
            InitializeComponent();
        }

        private void sendBtn_Click(object sender, EventArgs e)
        {
            string from = fromemailBox.Text;
            string pass = passBox.Text;
            string to = toemailBox.Text;
            string cc = ccBox.Text;
            string body = textBox.Text;
            fromemailBox.BackColor = Color.Pink;
            toemailBox.BackColor = Color.Pink;
            passBox.BackColor = Color.Pink;

           
            //Form validation
            if (!from.Contains("gmail") && !from.Contains("yahoo")) {
                warning.Text = "Insert valid email adress!";
                fromemailBox.BackColor = Color.Red;
                return;
                
            }
            if (passBox.Text == "")
            {
                warning.Text = "Insert valid password!";
                passBox.BackColor = Color.Red;
                return;

            }
            if (to.Contains("gmail") == false && to.Contains("yahoo") == false)
            {
                warning.Text = "Insert valid email adress!";
                toemailBox.BackColor = Color.Red;
                return;
               
            }
 
            if (fromemailBox.Text.Contains("@yahoo"))
            {

                try
                {
                    SmtpMail oMail = new SmtpMail("TryIt");
                    oMail.From = from;
                    oMail.To = to;                   
                    oMail.Subject = cc;                    
                    oMail.TextBody = body;
                    foreach (string path in this.mediaPaths)
                    {
                        if (path != null && System.IO.File.Exists(path))
                            oMail.AddAttachment(path);
                    }
                    SmtpServer oServer = new SmtpServer("smtp.mail.yahoo.com");
                    oServer.User = from;
                    oServer.Password = pass;       
                    oServer.Port = 465;
                    oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;
                    SmtpClient oSmtp = new SmtpClient();
                    oSmtp.SendMail(oServer, oMail);
                    MessageBox.Show("Email sent!");
                    warning.Text = "";
                    
                }
                catch  
                {
                    warning.Text = "Check from email,to or password!";
                    fromemailBox.BackColor = Color.Red;
                    toemailBox.BackColor = Color.Red;
                    passBox.BackColor = Color.Red;
                } 
            }
            else if (fromemailBox.Text.Contains("@gmail"))
            {
                try
                {
                    SmtpMail oMail = new SmtpMail("TryIt");
                    oMail.From = from;
                    oMail.To = to;
                    oMail.Subject = cc;
                    oMail.TextBody = body;
                    foreach (string path in this.mediaPaths)
                    {
                        if(path!=null && System.IO.File.Exists(path))
                                oMail.AddAttachment(path);
                    }
                    SmtpServer oServer = new SmtpServer("smtp.gmail.com");
                    oServer.User = from;
                    oServer.Password = pass;
                    oServer.Port = 465;
                    oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;
                    SmtpClient oSmtp = new SmtpClient();
                    oSmtp.SendMail(oServer, oMail);
                    MessageBox.Show("Email sent!");
                    warning.Text = "";
                    
                }
                catch  
                {

                    warning.Text = "Email or password wrong or too many files selected!";
                    fromemailBox.BackColor = Color.Red;
                    toemailBox.BackColor = Color.Red;
                    passBox.BackColor = Color.Red;
                }
            }
            else { warning.Text = "Problem in sending email!Try again!"; }
        }
        private bool pass_invisible=true;
        private void seePassBtn_Click(object sender, EventArgs e)
        {
            if (pass_invisible == false)
            {
                passBox.UseSystemPasswordChar = true;
                pass_invisible = true;
                seePassBtn.Text = "see";
                
            }
            else if (pass_invisible == true)
            {
                passBox.UseSystemPasswordChar = false;
                pass_invisible = false;
                seePassBtn.Text = "hide";
            }
        }
    }
}
