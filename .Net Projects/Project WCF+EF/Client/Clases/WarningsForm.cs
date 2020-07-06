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
    public partial class WarningsForm : Form
    {
        private string[] warnings = new string[100];
        public WarningsForm(string[] warn)
        {
            InitializeComponent();
            warn.CopyTo(this.warnings, 0);
            ShowWarnings();


        }
        private void ShowWarnings()
        {
            foreach (string path in warnings)
            {
                if (path != null)
                {
                    namesBox.Items.Add(System.IO.Path.GetFileName(path).ToString());
                    pathBox.Items.Add(path);
                }
            }
        }

        private void removeBtn_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.OK;
        }
    }
}
