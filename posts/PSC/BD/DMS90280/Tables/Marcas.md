# Table: Marcas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMarcas | smallint | NO |
| Nombre | nvarchar | NO |
| FkMarcaTipos | smallint | NO |
| PorVersion | bit | NO |
| ProcedenciaObligatoria | bit | NO |
| ComisionObligatoria | bit | NO |
| PorExtModelo | bit | NO |
| PorAñoModelo | bit | NO |
| FkRecursos | int | NO |
| ConfiguracionTextoGarantia1 | nvarchar | YES |
| ConfiguracionTextoGarantia2 | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ControlarRelacionesOpcionales | bit | NO |
| FkMR | nvarchar | YES |
| BackColorCabeceraRGB | nvarchar | YES |
| BackColorDetalleRGB | nvarchar | YES |
| ForeColorCabeceraRGB | nvarchar | YES |
| ForeColorDetalleRGB | nvarchar | YES |
| FechaBaja | datetime | YES |
| FkRecursos_LogoConNombre | int | YES |
| FechaMod | datetime | NO |
| TrabajaPrecioAnticipoGastos | bit | YES |
| CodModeloExternoObligatorio | bit | NO |
| DescripcionOficial | nvarchar | YES |
| NoValidarVIN | bit | NO |
