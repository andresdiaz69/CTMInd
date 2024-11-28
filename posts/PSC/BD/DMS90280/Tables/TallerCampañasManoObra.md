# Table: TallerCampañasManoObra

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkTallerCampañas | nvarchar | NO |
| PkFkCampañaVariante | nvarchar | NO |
| PkTallerCampañasManoObra_Iden | int | NO |
| FkManoObraCodigos | nvarchar | YES |
| FkVariante | nvarchar | YES |
| Descripcion | nvarchar | NO |
| UT | int | NO |
| PorcDescuento | decimal | YES |
| FkManoObraTipos | smallint | YES |
| FechaBaja | datetime | YES |
| PrecioHora | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
