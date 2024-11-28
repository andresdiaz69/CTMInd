# Table: TallerCampañasMaterial

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkTallerCampañas | nvarchar | NO |
| PkFkCampañaVariante | nvarchar | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | YES |
| PorcDescuento | decimal | YES |
| FkManoObraTipos | smallint | YES |
| FechaBaja | datetime | YES |
| Unidades | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
