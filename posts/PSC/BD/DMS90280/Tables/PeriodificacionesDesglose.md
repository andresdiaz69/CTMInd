# Table: PeriodificacionesDesglose

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFKPeriodificaciones | int | NO |
| PkPeriodificacionesDesglose_Iden | smallint | NO |
| Importe | decimal | YES |
| Porcentaje | decimal | YES |
| FkCentros_Desglose | smallint | YES |
| FkDepartamentos_Desglose | nvarchar | YES |
| FkSecciones_Desglose | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkVentaCanales | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCompraCanales | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
