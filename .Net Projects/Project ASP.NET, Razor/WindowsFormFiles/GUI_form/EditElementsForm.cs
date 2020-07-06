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
    
    public partial class EditElementsForm : Form
    {
        public string update_description;
        public EditElementsForm()
        {
            InitializeComponent();
            
          
        }

        private void UpdateBtn_Click(object sender, EventArgs e)
        {
            update_description = inputLabel.Text;
            //UpdateBtn.DialogResult = DialogResult.Yes;
            if (update_description == "") MessageBox.Show("Insert new description,then Update!");
            else this.DialogResult = DialogResult.OK;
        }

        private void DeleteBtn_Click(object sender, EventArgs e)
        {
            DeleteBtn.DialogResult = DialogResult.No;
            this.DialogResult = DialogResult.No;
        }
    }
}
