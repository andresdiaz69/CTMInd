# Table: FacturaAtipicaDetDesglose

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkFacturaAtipicaDet | int | NO |
| PkFacturaAtipicaDetDesglose_Iden | smallint | NO |
| FkCentros_Desglose | smallint | NO |
| FkDepartamentos_Desglose | nvarchar | YES |
| FkSecciones_Desglose | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Importe | decimal | NO |
| Porcentaje | decimal | NO |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkVentaCanales | nvarchar | YES |
