# Table: ICInformes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkICInformes_Iden | smallint | NO |
| FkEmpresas | smallint | NO |
| Descripcion | nvarchar | NO |
| DesglosePorDepartamento | bit | NO |
| DesglosePorSeccion | bit | NO |
| DesglosePorMarca | bit | NO |
| DesglosePorGama | bit | NO |
| DesglosePorMR | bit | NO |
| DesglosePorClasificacion1 | bit | NO |
| DesglosePorVentaCanales | bit | NO |
| DesglosePorCompraCanales | bit | NO |
| DesglosePorDepartamento_Aux | bit | NO |
| NombreHoja | nvarchar | YES |
| ColumnaDCI | nvarchar | YES |
| ColumnaImportes | nvarchar | YES |
| FilaInicial | smallint | YES |
| SeparadorDecimal | nvarchar | YES |
| FechaObtencionResumenContable | datetime | YES |
| FechaDesdeDatosResumenContable | datetime | YES |
| FechaObtencionCuentas | datetime | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkICInformeTipos | smallint | YES |
