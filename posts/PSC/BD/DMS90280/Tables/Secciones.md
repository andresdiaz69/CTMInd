# Table: Secciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkSecciones_Iden | int | NO |
| Descripcion | nvarchar | NO |
| FkDepartamentos | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NombreDireccion | nvarchar | YES |
| RatioTaller | decimal | YES |
| AlmacenInalambrico | bit | NO |
| MostrarStockConsultaReferenciasAI | bit | NO |
| FkCodigosProducto | nvarchar | YES |
| FkModulos_CodigosProducto | nvarchar | YES |
| AIExterno | bit | NO |
