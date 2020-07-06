using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GUI_form
{
    public partial class AddNewProperty : Form
    {
         
        public string property = null;
        public bool setFlag = false;
        public AddNewProperty()
        {
            InitializeComponent();
            //addNewPropertyBtn.DialogResult = DialogResult.OK;
            //addNewPropertyBtn.DialogResult = DialogResult.None;
            // --- addNewPropertyBtn.DialogResult = DialogResult.OK;
        }

        private void addNewPropertyBtn_Click(object sender, EventArgs e)
        {
            
            if(inputNewProperty.Text != "")
            {
                property = inputNewProperty.Text;                
                setFlag = true;
                this.DialogResult = DialogResult.OK;
            }
            else
            {
                MessageBox.Show("Property is empty!");
               // inputNewProperty.Text = addNewPropertyBtn.DialogResult.ToString();
            }

        }
    }
}
