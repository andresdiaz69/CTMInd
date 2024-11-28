# Table: Requisiciones_RelacionesPersonales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdTable | bigint | NO |
| IdSolicitud | int | NO |
| CedulaCandidato | nvarchar | NO |
| Familiar_Activos | bit | YES |
| Parentesco_Familiar | nvarchar | YES |
| UserName_Familiar | bigint | YES |
| Nombre_Familiar | nvarchar | YES |
| CodEmpresa_Familiar | smallint | YES |
| Empresa_Familiar | nvarchar | YES |
| CodLinea_Familiar | smallint | YES |
| Linea_Familiar | nvarchar | YES |
| CodCargo_Familiar | smallint | YES |
| Cargo_Familiar | nvarchar | YES |
| TrabajoAnteriormente | bit | YES |
| CodCargoAnterior | smallint | YES |
| NombreCargoAnterior | nvarchar | YES |
| CodLineaAnterior | smallint | YES |
| NombreLineaAnterior | nvarchar | YES |
| FechaIngresoAnterior | datetime | YES |
| FechaRetiroAnterior | datetime | YES |
| CausaRetiro | nvarchar | YES |
| AnoRetiro | smallint | YES |
| FechaRegistro | datetime | YES |
