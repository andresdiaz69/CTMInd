# View: vw_CruceFacturas_EmpleadosActivos

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

---- VISTAS ---

CREATE VIEW [dbo].[vw_CruceFacturas_EmpleadosActivos]
AS
SELECT DISTINCT s.CodigoEmpleado,  s.Ano_Periodo,    s.Mes_Periodo,				Nombres,            Apellido1,         
				Apellido2,         Unidad_Negocio,	 Nombre_Unidad_Negocio,		codigo_centro,		nombre_centro,
				Email_Corporativo, NombreEmpleado =  REPLACE(LTRIM(RTRIM(Nombres + Apellido1 + Apellido2)), ' ','')
		  FROM (SELECT a.CodigoEmpleado,   a.Ano_Periodo,  MAX(Mes_Periodo) Mes_Periodo
				  FROM (SELECT DISTINCT max (Ano_Periodo) ano_periodo, CodigoEmpleado
					      FROM EmpleadosActivos                        
                      GROUP BY CodigoEmpleado)  a 
				    INNER JOIN EmpleadosActivos b  ON a.codigoempleado = b.codigoempleado
						    					  AND a.ano_periodo    = b.ano_periodo
                         WHERE b.Estado = 'Activo' 
					  GROUP BY a.CodigoEmpleado, a.Ano_Periodo) s
				    INNER JOIN EmpleadosActivos  c  ON s.codigoempleado = c.codigoempleado
												   AND s.ano_periodo    = c.ano_periodo
												   AND s.Mes_Periodo    = c.Mes_Periodo 

```
