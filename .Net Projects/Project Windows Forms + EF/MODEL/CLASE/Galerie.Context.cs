﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PROIECT_GALERIE
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class GalerieContainer : DbContext
    {
        public GalerieContainer()
            : base("name=GalerieContainer")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
        
        public /*virtual*/ DbSet<Properties> PropertiesSet { get; set; }
        public /*virtual*/ DbSet<Media> MediaSet { get; set; }
    }
}
